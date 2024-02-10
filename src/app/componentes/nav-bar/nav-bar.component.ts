import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  ingresarUsuario(): void{
    this.router.navigate(['ingresar-estudiantes']);
  }

  modificarUsuario(): void{
    this.router.navigate(['modificar-estudiantes']);
  }

  eliminarUsuario(): void{
    this.router.navigate(['eliminar-estudiantes']);
  }
  
  inicio(): void{
    this.router.navigate(['**']);
  }

}
