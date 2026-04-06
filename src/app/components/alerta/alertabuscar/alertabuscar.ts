import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Alerta } from '../../../models/Alerta';
import { AlertaService } from '../../../services/alerta-service';

@Component({
  selector: 'app-alertabuscar',
  imports: [MatTableModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,],
  templateUrl: './alertabuscar.html',
       providers: [provideNativeDateAdapter()],
  styleUrl: './alertabuscar.css',
})
export class Alertabuscar {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','cF'];
  id: number=0;
  form: FormGroup;
  mensaje: string = '';
constructor(private aS: AlertaService, private fb: FormBuilder) {
    this.form = this.fb.group({
      idbusqueda: [''],
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      idbusqueda: [this.id],
    });

    this.buscar(this.id);

    this.form.get('idbusqueda')?.valueChanges.subscribe((id: number | null) => {
      this.buscar(id);
    });
  }

  buscar(id: number | null): void {
  this.mensaje = ''; 

  if (!id) {
    this.aS.list().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Alerta>(data);
        this.mensaje = data.length === 0 ? 'No hay registros disponibles.' : '';
      },
      error: (err) => {
        console.error('Error al listar:', err);
        this.mensaje = 'Error al obtener los registros.';
      },
    });
    return;
  }
  const idA = Number(id);
  if (isNaN(idA)) {
    this.mensaje = 'ID inválido.';
    this.dataSource = new MatTableDataSource<Alerta>([]);
    return;
  }
  this.aS.search(idA).subscribe({
    next: (data) => {
      // Si el backend retorna un solo objeto, conviértelo en array
      const result = Array.isArray(data) ? data : [data];
      this.dataSource = new MatTableDataSource<Alerta>(result);
      this.mensaje = result.length === 0 ? 'No se encontraron registros.' : '';
    },
    error: (err) => {
      if (err.status === 404) {
        this.mensaje = 'No se encontró el registro.';
      } else {
        this.mensaje = 'Ocurrió un error al buscar los registros.';
      }
      this.dataSource = new MatTableDataSource<Alerta>([]);
    },
  });
}
}
