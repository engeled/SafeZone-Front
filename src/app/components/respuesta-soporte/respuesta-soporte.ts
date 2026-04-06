import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Respuestasoportelistar } from "./respuestasoportelistar/respuestasoportelistar";

@Component({
  selector: 'app-respuesta-soporte',
  imports: [RouterOutlet, Respuestasoportelistar],
  templateUrl: './respuesta-soporte.html',
  styleUrl: './respuesta-soporte.css',
})
export class RespuestaSoporte {
  constructor(public route:ActivatedRoute){}
}
