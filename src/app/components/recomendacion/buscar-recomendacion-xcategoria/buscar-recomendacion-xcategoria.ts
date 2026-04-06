import { Component, OnInit } from '@angular/core';
import { BuscarRecomendacionXCategoriaDTO } from '../../../models/BuscarRecomendacionXCategoriaDTO';
import { RecomendacionService } from '../../../services/recomendacion-service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-buscar-recomendacion-xcategoria',
  imports: [FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CommonModule],
  templateUrl: './buscar-recomendacion-xcategoria.html',
  styleUrl: './buscar-recomendacion-xcategoria.css',
})
export class BuscarRecomendacionXCategoria implements OnInit {

   categoria: string = "";
  reporte: BuscarRecomendacionXCategoriaDTO[] = [];

  displayedColumns: string[] = ['username', 'categoria', 'cantidad'];

  // mismas categorías del registrar recomendación
  tipos = [
    { value: 'Software Updates', viewValue: 'Software Updates' },
    { value: 'Network Security', viewValue: 'Network Security' },
    { value: 'Backup & Recovery', viewValue: 'Backup & Recovery' },
    { value: 'Phishing Awareness', viewValue: 'Phishing Awareness' },
    { value: 'Malware Detection', viewValue: 'Malware Detection' },
    { value: 'Best Security Practices', viewValue: 'Best Security Practices' },
  ];

  constructor(private recomendacionService: RecomendacionService) {}

  ngOnInit(): void {}

  buscar() {
    this.recomendacionService.buscarPorCategoria(this.categoria).subscribe({
      next: (data) => {
        this.reporte = data;
      },
      error: () => {
        alert("No existen datos para esa categoría.");
        this.reporte = [];
      }
    });
  }

}
