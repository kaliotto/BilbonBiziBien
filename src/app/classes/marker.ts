export class Marker {
  id: number;
  nombre: string;
  latitud: number;
  longitud: number;
  visible: boolean;

  static mapear(lista: any[]): Marker[] {
    if (!lista) return;

    let res: Marker[] = [];
    for (let i = 0; i < lista.length; i++) {
      let auxMkr: Marker = new Marker();
      auxMkr.id = lista[i].id;
      auxMkr.nombre = lista[i].nombre;
      auxMkr.latitud = lista[i].latitud;
      auxMkr.longitud = lista[i].longitud;
      auxMkr.visible = true;
      res.push(auxMkr);
    }

    return res;
  }
}
