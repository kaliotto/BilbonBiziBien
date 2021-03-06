import { Component, OnInit } from '@angular/core';
import { PuntosBiciService } from '../../services/puntos-bici.service';
import { PuntoBici } from '../../classes/punto-bici';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  loading: boolean = true;
  refreshing: boolean = false;
  puntosBici: PuntoBici[];
  puntosBiciFavs: PuntoBici[];
  puntosBiciNoFavs: PuntoBici[];
  favoritos: number[] = JSON.parse(localStorage.getItem("favoritosBBB")) || [];

  constructor(private _pbs: PuntosBiciService) {
    if (localStorage.getItem("puntosBici")) {
      this.puntosBici = JSON.parse(localStorage.getItem("puntosBici"));
      this.puntosBiciFavs = this.puntosBici.filter(pb => this.favoritos.indexOf(pb.id) >= 0);
      this.puntosBiciNoFavs = this.puntosBici.filter(pb => this.favoritos.indexOf(pb.id) < 0);
      this.loading = false;
      this.actualizarDatos();
    } else {
      this._pbs.getPuntosBici().subscribe(data => {
        this.puntosBici = data;
        localStorage.setItem("puntosBici", JSON.stringify(this.puntosBici));
        this.puntosBiciFavs = data.filter(pb => this.favoritos.indexOf(pb.id) >= 0);
        this.puntosBiciNoFavs = data.filter(pb => this.favoritos.indexOf(pb.id) < 0);
        this.loading = false;
      });
    }
  }

  toggleFav(id: number) {
    let pos = this.favoritos.indexOf(id);
    if (pos >= 0) {
      this.favoritos.splice(pos, 1);
      let aux = this.puntosBiciFavs.splice(this.puntosBiciFavs.findIndex(x => x.id == id), 1)
      this.puntosBiciNoFavs.splice(aux[0].posicion - 1, 0, aux[0]);
    } else {
      this.favoritos.push(id);
      let aux = this.puntosBiciNoFavs.splice(this.puntosBiciNoFavs.findIndex(x => x.id == id), 1)
      this.puntosBiciFavs.push(aux[0]);
    }
    localStorage.setItem('favoritosBBB', JSON.stringify(this.favoritos));
  }

  buscar(busq: string) {
    if (busq.length > 2) {
      this.puntosBiciFavs = this.puntosBiciFavs.filter(pb => pb.nombreCompleto.toLowerCase().indexOf(busq) > 0);
      this.puntosBiciNoFavs = this.puntosBiciNoFavs.filter(pb => pb.nombreCompleto.toLowerCase().indexOf(busq) > 0);
    } else {
      this.puntosBiciFavs = this.puntosBici.filter(pb => this.favoritos.indexOf(pb.id) >= 0);
      this.puntosBiciNoFavs = this.puntosBici.filter(pb => this.favoritos.indexOf(pb.id) < 0);
    }
  }

  actualizarDatos() {
    this.refreshing = true;
    this._pbs.getPuntosBici().subscribe(data => {
      this.puntosBici = PuntoBici.actualizarDatos(this.puntosBici, <PuntoBici[]>data);
      this.refreshing = false;
    });
  }
}
