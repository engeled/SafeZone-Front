import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Archivolistar } from "./archivolistar/archivolistar";

@Component({
  selector: 'app-archivos',
  imports: [RouterOutlet, Archivolistar],
  templateUrl: './archivos.html',
  styleUrl: './archivos.css',
})
export class Archivos {
  constructor(public route:ActivatedRoute) {}
}
