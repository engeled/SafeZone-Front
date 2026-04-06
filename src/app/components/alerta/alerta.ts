import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Alertalistar } from './alertalistar/alertalistar';

@Component({
  selector: 'app-alerta',
  imports: [Alertalistar,RouterOutlet],
  templateUrl: './alerta.html',
  styleUrl: './alerta.css',
})
export class Alerta {
    constructor(public route:ActivatedRoute) {}
}
