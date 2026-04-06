import { Component } from '@angular/core';
import { Cuentalistar } from "./cuentalistar/cuentalistar";
import { ActivatedRoute, RouterModule } from "@angular/router";

@Component({
  selector: 'app-cuenta',
  imports: [Cuentalistar, RouterModule],
  templateUrl: './cuenta.html',
  styleUrl: './cuenta.css',
})
export class Cuenta {
  constructor(public route:ActivatedRoute) {}

}
