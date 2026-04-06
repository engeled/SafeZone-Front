import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogAcceso } from '../../../models/LogAcceso';
import { LogAccesoService } from '../../../services/log-acceso-service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-logaccesobuscar',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    MatIcon
],
  templateUrl: './logaccesobuscar.html',
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./logaccesobuscar.css']
})
export class LogAccesoBuscarComponent {

  dataSource: MatTableDataSource<LogAcceso> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  filtroId: number = 0;
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;

  mensaje: string = "";

  constructor(private lS: LogAccesoService) {}

  buscar() {
    if (this.filtroId <= 0 || !this.fechaInicio || !this.fechaFin) {
      this.mensaje = "Debe ingresar el ID y ambas fechas.";
      return;
    }

    const fiString = this.fechaInicio.toISOString().split('T')[0];
    const ffString = this.fechaFin.toISOString().split('T')[0];

    this.lS.buscarPorUsuarioYRango(this.filtroId, fiString, ffString).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.mensaje = data.length > 0 ? "" : "No se encontraron logs en ese rango.";
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
