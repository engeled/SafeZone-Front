import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recurso } from '../../../models/Recurso';
import { RecursoService } from '../../../services/recurso-service';

@Component({
  selector: 'app-recursobuscar',
  imports: [MatTableModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,],
  templateUrl: './recursobuscar.html',
   providers: [provideNativeDateAdapter()],
  styleUrl: './recursobuscar.css',
})
export class Recursobuscar {
dataSource: MatTableDataSource<Recurso> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','cF'];
  id: number=0;
  form: FormGroup;
  mensaje: string = '';
constructor(private rS : RecursoService, private fb: FormBuilder) {

  
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
    this.rS.list().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Recurso>(data);
        this.mensaje = data.length === 0 ? 'No hay registros disponibles.' : '';
      },
      error: (err) => {
        console.error('Error al listar:', err);
        this.mensaje = 'Error al obtener los registros.';
      },
    });
    return;
  }
  const idR = Number(id);
  if (isNaN(idR)) {
    this.mensaje = 'ID inválido.';
    this.dataSource = new MatTableDataSource<Recurso>([]);
    return;
  }
  this.rS.search(idR).subscribe({
    next: (data) => {
      // Si el backend retorna un solo objeto, conviértelo en array
      const result = Array.isArray(data) ? data : [data];
      this.dataSource = new MatTableDataSource<Recurso>(result);
      this.mensaje = result.length === 0 ? 'No se encontraron registros.' : '';
    },
    error: (err) => {
      if (err.status === 404) {
        this.mensaje = 'No se encontró el registro.';
      } else {
        this.mensaje = 'Ocurrió un error al buscar los registros.';
      }
      this.dataSource = new MatTableDataSource<Recurso>([]);
    },
  });
}
}
