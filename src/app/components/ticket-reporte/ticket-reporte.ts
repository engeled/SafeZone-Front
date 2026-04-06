import { Component } from '@angular/core';
import { Ticketreportelistar } from "./ticketreportelistar/ticketreportelistar";
import { ActivatedRoute, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-ticket-reporte',
  imports: [Ticketreportelistar,RouterOutlet],
  templateUrl: './ticket-reporte.html',
  styleUrl: './ticket-reporte.css',
})
export class TicketReporte {
  constructor(public route:ActivatedRoute){}
}
