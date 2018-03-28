import { Component, OnInit } from '@angular/core';
import { PuntosBiciService } from '../../services/puntos-bici.service';
import { PuntoBici } from '../../classes/punto-bici';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styles: []
})
export class CartasComponent {
  puntosBici: PuntoBici[];
  constructor(private _pbs: PuntosBiciService) {
    // this._pbs.getPuntosBici().subscribe(data => {
    //   this.puntosBici = PuntoBici.mapear(data.RESPUESTA[0].LISTA[0].DETALLE);
    // });
  }
}
