import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role-service';

@Component({
  selector: 'app-rollistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink,CommonModule],
  templateUrl: './rollistar.html',
  styleUrl: './rollistar.css',
})
export class Rollistar implements OnInit {
 dataSource: MatTableDataSource<Role> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'cF','c3','c4'];

  constructor(private rS: RoleService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
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
