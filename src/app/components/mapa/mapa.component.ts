import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CONFIG } from '../../config';
import { PuntoBici } from '../../classes/punto-bici';
import { Marker } from '../../classes/marker';
import { PuntosBiciService } from '../../services/puntos-bici.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: ['agm-map { height: 27em !important; }']
})
export class MapaComponent {
  loading = true;
  LAT_BILBAO: number = 43.263055;
  LNG_BILBAO: number = -2.934991;
  puntosBici: PuntoBici[];
  marcadores: Marker[];
  puntosBiciCopy: PuntoBici[];
  marcadoresCopy: Marker[];

  constructor(private _pbs: PuntosBiciService) {
    if (this._pbs.puntosBici.length > 0) {
      this.puntosBici = this._pbs.puntosBici
      this.marcadores = Marker.mapear(this.puntosBici);
      this.puntosBiciCopy = JSON.parse(JSON.stringify(this.puntosBici));
      this.marcadoresCopy = JSON.parse(JSON.stringify(this.puntosBici));
      this.loading = false;
    } else {
      this._pbs.getPuntosBici().subscribe(data => {
        this.puntosBici = data;
        this.marcadores = Marker.mapear(this.puntosBici);
        this.puntosBiciCopy = JSON.parse(JSON.stringify(this.puntosBici));
        this.marcadoresCopy = JSON.parse(JSON.stringify(this.puntosBici));
        this.loading = false;
      });
    }
  }

  toggleVisibility(id: number) {
    let auxMkr = this.marcadores.find(x => x.id == id);
    auxMkr.visible = !auxMkr.visible;
  }

  selectAll() {
    this.marcadores.forEach(x => x.visible = true);
  }
  selectNone() {
    this.marcadores.forEach(x => x.visible = false);
  }

  buscar(busqTxt) {
    if (busqTxt.length > 2) {
      this.puntosBici = this.puntosBici.filter(pb => pb.nombre.toLowerCase().indexOf(busqTxt) >= 0);
      this.marcadores = this.marcadores.filter(mark => mark.nombre.toLowerCase().indexOf(busqTxt) >= 0);
    } else {
      this.puntosBici = this.puntosBiciCopy;
      this.marcadores = this.marcadoresCopy;
    }
  }
}
