import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Recomendacion } from '../../../models/Recomendacion';
import { RecomendacionService } from '../../../services/recomendacion-service';

@Component({
  selector: 'app-recomendacionlistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './recomendacionlistar.html',
  styleUrl: './recomendacionlistar.css',
})
export class Recomendacionlistar implements OnInit {
dataSource: MatTableDataSource<Recomendacion> = new MatTableDataSource();

    displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

    constructor(private rS: RecomendacionService) {}

    ngOnInit(): void {
      this.rS.list().subscribe((data) => {
        console.log('Datos recibidos de list():', data);
        this.dataSource = new MatTableDataSource(data);
      });
      this.rS.getList().subscribe((data) => {
        console.log('Datos recibidos de getList():', data);
        this.dataSource = new MatTableDataSource(data);
      });
    }
    eliminar(id: number) {
      this.rS.delete(id).subscribe((data) => {
        this.rS.list().subscribe(data=>{
          this.rS.setList(data)
        })
      });
    }
}
