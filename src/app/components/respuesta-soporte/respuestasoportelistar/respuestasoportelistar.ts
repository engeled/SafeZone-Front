import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RespuestaSoporte } from '../../../models/RespuestaSoporte';
import { RespuestaSoporteService } from '../../../services/respuesta-soporte-service';

@Component({
  selector: 'app-respuestasoportelistar',
  imports: [MatTableModule,MatButtonModule,MatIconModule, RouterLink,CommonModule],
  templateUrl: './respuestasoportelistar.html',
  styleUrl: './respuestasoportelistar.css',
})
export class Respuestasoportelistar implements OnInit {
  dataSource:MatTableDataSource<RespuestaSoporte>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c5','c6'];
  constructor(private rS:RespuestaSoporteService){}

  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }
  eliminar(id:number){
    this.rS.delete(id).subscribe((data)=>{
      this.rS.list().subscribe(data=>{
        this.rS.setList(data)
      })
    });
  }
}
