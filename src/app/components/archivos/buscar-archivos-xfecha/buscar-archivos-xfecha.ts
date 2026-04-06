import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BuscarArchivoXFechaDTO } from '../../../models/BuscarArchivoXFechaDTO';
import { ArchivoService } from '../../../services/archivo-service';

@Component({
  selector: 'app-buscar-archivos-xfecha',
  imports: [FormsModule, CommonModule],
  templateUrl: './buscar-archivos-xfecha.html',
  styleUrl: './buscar-archivos-xfecha.css',
})
export class BuscarArchivosXFecha {
  fechaInicio: string = "";
  fechaFin: string = "";
  resultado: BuscarArchivoXFechaDTO[] = [];

  constructor(private archivoService: ArchivoService) {}

  ngOnInit(): void {}

  buscar() {
    if (!this.fechaInicio || !this.fechaFin) {
      console.warn("⚠ Debes seleccionar ambas fechas");
      return;
    }

    this.archivoService.buscarPorFechas(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        console.log("📥 Datos recibidos desde backend:", data);
        this.resultado = data;
      },
      error: (err) => {
        console.error("❌ Error buscando archivos:", err);
      }
    });
  }
}
