import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { app_routing } from "./app.routes";

import { PuntosBiciService } from './services/puntos-bici.service';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CartasComponent } from './components/cartas/cartas.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PruebaComponent } from './components/prueba/prueba.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CartasComponent,
    DetalleComponent,
    MapaComponent,
    ContactoComponent,
    PruebaComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1EeEQtk2ZT9VNXpzW6q3cP9y4NMXYv9Q'
    })
  ],
  providers: [
    PuntosBiciService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
