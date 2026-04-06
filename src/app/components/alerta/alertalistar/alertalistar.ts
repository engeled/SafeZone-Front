import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AlertaService } from '../../../services/alerta-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Alerta } from '../../../models/Alerta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alertalistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink,CommonModule],
  templateUrl: './alertalistar.html',
  styleUrl: './alertalistar.css',
})
export class Alertalistar implements OnInit{
 dataSource: MatTableDataSource<Alerta> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'cF','c7', 'c8'];

  constructor(private aS: AlertaService) {}

  ngOnInit(): void {
    // Primera carga desde backend
  this.aS.list().subscribe(data => {
     this.dataSource = new MatTableDataSource(data);
  });

  // Refrescos posteriores desde el Subject
  this.aS.getList().subscribe(data => {
     this.dataSource = new MatTableDataSource(data);
  });
  }
  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe(data=>{
        this.aS.setList(data)
      })
    });
  }

}
