import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { IngresarEstudianteComponent } from './componentes/ingresar-estudiante/ingresar-estudiante.component';
import { EliminarEstudianteComponent } from './componentes/eliminar-estudiante/eliminar-estudiante.component';
import { VerEstudianteComponent } from './componentes/ver-estudiante/ver-estudiante.component';
import { ModificarEstudianteComponent } from './componentes/modificar-estudiante/modificar-estudiante.component';

const routes: Routes = [
  { path: 'ingresar-estudiantes', component: IngresarEstudianteComponent},
  { path: 'eliminar-estudiante/:id', component: EliminarEstudianteComponent},
  { path: 'estudiante/:id', component: VerEstudianteComponent},
  { path: 'modificar-estudiante/:id', component: ModificarEstudianteComponent},
  { path: '**', component: PrincipalComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
