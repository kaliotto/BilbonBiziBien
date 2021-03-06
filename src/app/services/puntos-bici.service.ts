import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { PuntoBici } from '../classes/punto-bici';
import 'rxjs/Rx';
import * as xmlToJSON from 'xmltojson';

@Injectable()
export class PuntosBiciService {
  puntosBici: PuntoBici[] = [];

  constructor(private _http: Http) {
  }

  getPuntosBici() {
    let url = "https://www.bilbao.eus/WebServicesBilbao/WSBilbao?s=ODPRESBICI&u=OPENDATA&p0=A&p1=A";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    return this._http.get(proxyurl + url)
      //return this._http.get(url)
      .map(res => {
        this.puntosBici = PuntoBici.mapear(
          xmlToJSON.parseString(res.text()).RESPUESTA[0].LISTA[0].DETALLE).sort((x, y) => {
            return y.posicion < x.posicion ? 1 // if y should come earlier, push x to end
              : y.posicion > x.posicion ? -1 // if y should come later, push x to begin
                : 0;
          });
        return this.puntosBici;
      });
  }

  getAddress(coordenadas) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordenadas.lat},${coordenadas.lng}&key=AIzaSyDNmLiWyeW1JZCqVmRDIq6hCHBpnUBmsUw`;

    return this._http.get(url)
      .map(res => {
        let dirComp = JSON.parse(res.text()).results[0];
        let dirForm = {
          calle: dirComp.address_components.find(x => x.types.indexOf("route") >= 0).long_name,
          numero: dirComp.address_components.find(x => x.types.indexOf("street_number") >= 0).long_name,
          cp: dirComp.address_components.find(x => x.types.indexOf("postal_code") >= 0).long_name
        };
        return `${dirForm.calle}, ${dirForm.numero} (${dirForm.cp})`
      });
  }
}
