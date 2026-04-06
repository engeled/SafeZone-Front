import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit{
  username: string = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      this.username = payload.sub;
    } else {
      this.username = "Invitado";
    }
  }

  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }
}
