import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogAcceso } from '../../../models/LogAcceso';
import { LogAccesoService } from '../../../services/log-acceso-service';

@Component({
  selector: 'app-logaccesolistar',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './log-accesolistar.html',
  styleUrls: ['./log-accesolistar.css'],
})
export class LogAccesoListar implements OnInit {
  dataSource: MatTableDataSource<LogAcceso> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private lS: LogAccesoService) {}

  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    if (confirm('¿Está seguro de eliminar este log de acceso?')) {
      this.lS.delete(id).subscribe(() => {
        this.lS.list().subscribe((data) => {
          this.lS.setList(data);
        });
      });
    }
  }
}
