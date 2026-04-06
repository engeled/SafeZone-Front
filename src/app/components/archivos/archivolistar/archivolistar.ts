import { Component, OnInit } from '@angular/core';
import { ArchivoService } from '../../../services/archivo-service';
import { Archivos } from '../../../models/Archivos';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-archivolistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './archivolistar.html',
  styleUrl: './archivolistar.css',
})
export class Archivolistar implements OnInit{
  dataSource: MatTableDataSource<Archivos> = new MatTableDataSource();

    displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

    constructor(private aS: ArchivoService) {}

    ngOnInit(): void {
      this.aS.list().subscribe((data) => {
        console.log('Datos recibidos de list():', data);
        this.dataSource = new MatTableDataSource(data);
      });
      this.aS.getList().subscribe((data) => {
        console.log('Datos recibidos de getList():', data);
        this.dataSource = new MatTableDataSource(data);
      });
    }
    eliminar(id: number) {
      this.aS.delete(id).subscribe((data) => {
        this.aS.list().subscribe(data=>{
          this.aS.setList(data)
        })
      });
    }
}
