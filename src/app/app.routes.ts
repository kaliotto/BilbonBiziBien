import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component"
import { DetalleComponent } from './components/detalle/detalle.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ContactoComponent } from './components/contacto/contacto.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes, { useHash: true });
