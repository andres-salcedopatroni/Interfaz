import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { IngresarEstudianteComponent } from './componentes/ingresar-estudiante/ingresar-estudiante.component';
import { FormsModule } from '@angular/forms';
import { EliminarEstudianteComponent } from './componentes/eliminar-estudiante/eliminar-estudiante.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PrincipalComponent,
    IngresarEstudianteComponent,
    EliminarEstudianteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
