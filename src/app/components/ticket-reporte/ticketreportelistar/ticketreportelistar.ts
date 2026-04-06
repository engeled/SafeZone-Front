import { Component, OnInit } from '@angular/core';
import { TicketSoporteService } from '../../../services/ticket-soporte-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TicketSoporte } from '../../../models/TicketSoporte';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticketreportelistar',
  imports: [MatTableModule,MatButtonModule,MatIconModule,RouterLink,CommonModule],
  templateUrl: './ticketreportelistar.html',
  styleUrl: './ticketreportelistar.css',
})
export class Ticketreportelistar implements OnInit{

  dataSource:MatTableDataSource<TicketSoporte>=new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7']
  
  constructor(private tS:TicketSoporteService){}

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe(data=>{
        this.tS.setList(data)
      })
    });
  }
}
