import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Usuariolistar } from './usuariolistar/usuariolistar';

@Component({
  selector: 'app-users',
  imports: [RouterOutlet, Usuariolistar],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  constructor(public route:ActivatedRoute) {}
}
