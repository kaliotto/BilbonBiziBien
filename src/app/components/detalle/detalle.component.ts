import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PuntosBiciService } from '../../services/puntos-bici.service';
import { PuntoBici } from '../../classes/punto-bici';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent {
  loading: boolean = true;
  direccion: string;
  pb: PuntoBici;

  constructor(private _activatedRoute: ActivatedRoute, private _pbs: PuntosBiciService) {
    this._activatedRoute.params.subscribe(params => {
      this._pbs.getPuntosBici().subscribe(data => {
        this.pb = data.find(aux => aux.id == params.id);
        this._pbs.getAddress({
          lat: this.pb.latitud,
          lng: this.pb.longitud
        }).subscribe(data => this.direccion = data);
        this.loading = false;
      });
    });
  }
}
