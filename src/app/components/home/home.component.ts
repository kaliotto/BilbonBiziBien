import { Component, OnInit } from '@angular/core';
import { PuntosBiciService } from '../../services/puntos-bici.service';
import { PuntoBici } from '../../classes/punto-bici';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  loading: boolean = true;
  puntosBiciFavs: PuntoBici[];
  puntosBiciNoFavs: PuntoBici[];
  favoritos: number[] = JSON.parse(localStorage.getItem("favoritosBBB")) || [];

  constructor(private _pbs: PuntosBiciService) {

    this._pbs.getPuntosBici().subscribe(data => {
      this.puntosBiciFavs = data.filter(pb => this.favoritos.indexOf(pb.id) >= 0);
      this.puntosBiciNoFavs = data.filter(pb => this.favoritos.indexOf(pb.id) < 0);
      this.loading = false;
    });
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
}
