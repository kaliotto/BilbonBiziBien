export class PuntoBici {
  id: number;
  nombreCompleto: string;
  nombre: string;
  posicion: number;
  anclajesAveriados: number;
  anclajesLibres: number;
  anclajesUsados: number;
  bicisAveriadas: number;
  bicisLibres: number;
  estado: string;
  latitud: number;
  longitud: number;

  static mapear(lista: any[]): PuntoBici[] {
    if (!lista) return;
    let res: PuntoBici[] = [];
    for (let i = 0; i < lista.length; i++) {
      let auxPB: PuntoBici = new PuntoBici();
      auxPB.id = lista[i].ID[0]._text;
      auxPB.nombreCompleto = lista[i].NOMBRE[0]._text;
      if (auxPB.nombreCompleto) {
        auxPB.nombre = auxPB.nombreCompleto.substring(auxPB.nombreCompleto.indexOf('-') + 1, auxPB.nombreCompleto.length);
        auxPB.posicion = parseInt(auxPB.nombreCompleto.substring(0, auxPB.nombreCompleto.indexOf('-')));
      }
      auxPB.anclajesAveriados = lista[i].AAVERIADOS[0]._text;
      auxPB.anclajesLibres = lista[i].ALIBRES[0]._text;
      auxPB.anclajesUsados = lista[i].AUSADOS[0]._text;
      auxPB.bicisAveriadas = lista[i].BAVERIADAS[0]._text;
      auxPB.bicisLibres = lista[i].BLIBRES[0]._text;
      auxPB.estado = lista[i].ESTADO[0]._text;
      auxPB.latitud = lista[i].LATITUD[0]._text;
      auxPB.longitud = lista[i].LONGITUD[0]._text;


      res.push(auxPB);
    }

    return res;
  }

  static actualizarDatos(lista: PuntoBici[], datosNuevos: PuntoBici[]): PuntoBici[] {
    lista.forEach(pbOld => {
      let pbNew = datosNuevos.find(x => x.id == pbOld.id);
      pbOld.anclajesAveriados = pbNew.anclajesAveriados;
      pbOld.anclajesLibres = pbNew.anclajesLibres;
      pbOld.anclajesUsados = pbNew.anclajesUsados;
      pbOld.bicisLibres = pbNew.bicisLibres;
      pbOld.bicisAveriadas = pbNew.bicisAveriadas;
    })

    return lista;
  }
}
