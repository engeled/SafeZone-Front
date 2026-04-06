import { Component } from '@angular/core';
import { Recomendacionlistar } from "./recomendacionlistar/recomendacionlistar";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recomendacion',
  imports: [Recomendacionlistar, RouterOutlet],
  templateUrl: './recomendacion.html',
  styleUrl: './recomendacion.css',
})
export class Recomendacion {
  constructor(public route:ActivatedRoute) {}
}
