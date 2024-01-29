import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { IngresarEstudianteComponent } from './componentes/ingresar-estudiante/ingresar-estudiante.component';
import { EliminarEstudianteComponent } from './componentes/eliminar-estudiante/eliminar-estudiante.component';

const routes: Routes = [
  { path: 'ingresar-estudiantes', component: IngresarEstudianteComponent},
  { path: 'eliminar-estudiantes', component: EliminarEstudianteComponent},
  { path: '**', component: PrincipalComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
