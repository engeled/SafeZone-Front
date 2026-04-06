import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) { }

  Registrar() {
    this.router.navigate(['/usuarios/registrar']);
  }

  IniciarSesion() {
    this.router.navigate(['/login']);
  }
}
