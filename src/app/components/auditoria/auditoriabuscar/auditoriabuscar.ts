import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; 
import { Auditoria } from '../../../models/Auditoria';
import { AuditoriaService } from '../../../services/auditoria-service';

@Component({
  selector: 'app-auditoriabuscar',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './auditoriabuscar.html',
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./auditoriabuscar.css']
})
export class AuditoriaBuscarComponent {

  dataSource: MatTableDataSource<Auditoria> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  filtroTipo: string = "";

  mensaje: string = "";

  listaTipos: string[] = ['Interna', 'Externa', 'Seguridad', 'Financiera', 'Sistemas', 'Error', 'Reporte', 'Config'];

  constructor(private aS: AuditoriaService) {}

  buscar() {
    if (!this.fechaInicio || !this.fechaFin || !this.filtroTipo) {
      this.mensaje = "Debe ingresar ambas fechas y seleccionar el tipo.";
      return;
    }

    const fiString = this.fechaInicio.toISOString().split('T')[0];
    const ffString = this.fechaFin.toISOString().split('T')[0];

    this.aS.buscarPorFechaYTipo(fiString, ffString, this.filtroTipo).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.mensaje = data.length > 0 ? "" : "No se encontraron auditorías con esos criterios.";
      },
      error: (err) => {
        console.error(err);
        this.dataSource.data = [];
        if (err.status === 404) {
          this.mensaje = "No se encontraron resultados.";
        } else {
          this.mensaje = "Ocurrió un error en la búsqueda.";
        }
      }
    });
  }
}
