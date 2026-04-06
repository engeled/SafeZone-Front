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
import { Cuenta } from '../../../models/Cuenta';
import { CuentaService } from '../../../services/cuenta-service';

@Component({
  selector: 'app-cuentabuscar',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './cuentabuscar.html',
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./cuentabuscar.css']
})
export class CuentaBuscarComponent {

  dataSource: MatTableDataSource<Cuenta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  filtroId: number = 0;
  filtroFecha: Date | null = null;

  mensaje: string = "";

  constructor(private cS: CuentaService) {}

  buscar() {
    if (this.filtroId <= 0 || !this.filtroFecha) {
      this.mensaje = "Debe ingresar un ID de usuario válido y una fecha.";
      return;
    }

    const fechaString = this.filtroFecha.toISOString().split('T')[0];

    this.cS.buscarCuentasActivas(this.filtroId, fechaString).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.mensaje = data.length > 0 ? "" : "No se encontraron cuentas activas.";
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
