import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from './services/login-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, RouterOutlet, MatIconModule, MatButtonModule, CommonModule, FormsModule, MatMenuModule, MatToolbarModule, MatIconModule, RouterModule],
})
export class App {
  protected readonly title = signal('SafeZoneG1AW');
  isMuted = true;
  volumenPersonalizado = 0.2;

  role: string = '';
  usuario: string = '';

  mostrarMenu = true; // ← NUEVO

  constructor(private loginService: LoginService, private router: Router) {
    // Detecta cambios de ruta
    this.router.events.subscribe(() => {
      const ruta = this.router.url;
      this.mostrarMenu = !(ruta === '/home' || ruta === '/login' || ruta== '/registrar');
    });
  }

  cerrar() {
    sessionStorage.clear();
  }


  verificar() {
    this.role = this.loginService.showRole();

    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isCliente() {
    return this.role === 'CLIENTE';
  }

  isSecretario() {
    return this.role === 'SECRETARIO';
  }

  isAgente() {
    return this.role === 'AGENTE';
  }

  toggleMute(audio: HTMLAudioElement) {
    if (this.isMuted) {
      // Desmutea y fija volumen personalizado
      this.isMuted = false;
      audio.muted = false;
      audio.volume = this.volumenPersonalizado;
      if (audio.paused) {
        audio.play();
      }
    } else {
      // Mutea
      this.isMuted = true;
      audio.muted = true;
    }
  }

}
