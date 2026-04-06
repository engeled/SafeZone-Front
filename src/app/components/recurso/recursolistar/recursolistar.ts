import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Recurso } from '../../../models/Recurso';
import { RecursoService } from '../../../services/recurso-service';

@Component({
  selector: 'app-recursolistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink,CommonModule],
  templateUrl: './recursolistar.html',
  styleUrl: './recursolistar.css',
})
export class Recursolistar implements OnInit {
 dataSource: MatTableDataSource<Recurso> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'cF','c7','c8'];

  constructor(private rS: RecursoService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe(data=>{
        this.rS.setList(data)
      })
    });
  }
}
