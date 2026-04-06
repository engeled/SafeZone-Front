import { Component } from '@angular/core';
import { Recursolistar } from './recursolistar/recursolistar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recurso',
  imports: [Recursolistar,RouterOutlet],
  templateUrl: './recurso.html',
  styleUrl: './recurso.css',
})
export class Recurso {
    constructor(public route:ActivatedRoute) {}
}
