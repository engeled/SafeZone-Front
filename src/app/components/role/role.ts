import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Rollistar } from './rollistar/rollistar';

@Component({
  selector: 'app-role',
  imports: [Rollistar,RouterOutlet],
  templateUrl: './role.html',
  styleUrl: './role.css',
})
export class Role {
constructor(public route:ActivatedRoute) {}
}
