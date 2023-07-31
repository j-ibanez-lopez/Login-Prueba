import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
{
  lista: string[];
  metodo: string[];

  constructor(){
    this.lista = ['Nuestro centro', 'Equipo', 'Exámenes', 'blog', 'Contacto'];
    this.metodo = ['Método 1', 'Método 2', 'Método 3', 'Método 4', 'Método 5']
  }
}
