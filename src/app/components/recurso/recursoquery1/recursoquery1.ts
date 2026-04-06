import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recurso } from '../../../models/Recurso';
import { RecursoService } from '../../../services/recurso-service';

@Component({
  selector: 'app-recursoquery1',
  imports: [MatTableModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,],
  templateUrl: './recursoquery1.html',
     providers: [provideNativeDateAdapter()],
  styleUrl: './recursoquery1.css',
})
export class Recursoquery1 implements OnInit{
dataSource: MatTableDataSource<Recurso> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','cF'];
  form: FormGroup;
  mensaje: string = '';
constructor(private rS : RecursoService, private fb: FormBuilder) {
    this.form = this.fb.group({
      tipo: [''],
      nivel: [''],
    });
  }

  ngOnInit(): void {
    this.cargarTodo();
    this.form.valueChanges.subscribe(values => {
      const tipo = values.tipo?.trim() || null;
      const nivel = values.nivel?.trim() || null;
      
      if (!tipo && !nivel) {
        this.cargarTodo();
      } else {
        this.buscar(tipo, nivel);
      }
    });
  }


  cargarTodo(): void {
    this.rS.list().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Recurso>(data);
        this.mensaje = data.length === 0 ? 'No hay registros disponibles.' : '';
      },
      error: (err) => {
        console.error('Error al listar:', err);
        this.mensaje = 'Error al obtener los registros.';
      }
    });
  }


  buscar(tipo: string | null,nivel: string | null): void {
  this.mensaje = ''; 

  if (!tipo && !nivel) {
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
  const tipos: string = tipo || '';
  const niveles: string = nivel || '';

  this.rS.query1(tipos, niveles).subscribe({
    next: (data) => {
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