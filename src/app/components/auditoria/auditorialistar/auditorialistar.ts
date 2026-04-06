import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Auditoria } from '../../../models/Auditoria';
import { AuditoriaService } from '../../../services/auditoria-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auditorialistar',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './auditorialistar.html',
  styleUrls: ['./auditorialistar.css'],
})
export class AuditoriaListar implements OnInit {
  dataSource: MatTableDataSource<Auditoria> = new MatTableDataSource();
 
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7'];

  constructor(private aS: AuditoriaService) {}

  ngOnInit(): void {
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.aS.list().subscribe((data) => {
      this.aS.setList(data);
    });
  }

  eliminar(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este registro de auditoría?')) {
        this.aS.delete(id).subscribe(() => {
            this.aS.list().subscribe((data) => {
                this.aS.setList(data);
            });
        });
    }
  }
}
