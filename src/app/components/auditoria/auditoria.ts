import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuditoriaListar } from './auditorialistar/auditorialistar';

@Component({
  selector: 'app-auditoria',
  imports: [RouterOutlet, AuditoriaListar],
  templateUrl: './auditoria.html',
  styleUrl: './auditoria.css',
})
export class Auditoria {
 constructor(public route:ActivatedRoute) {}
}
