import { Component, OnInit } from '@angular/core';
import { Users } from '../../../models/Users';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../../../services/users-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuariolistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './usuariolistar.html',
  styleUrl: './usuariolistar.css',
})
export class Usuariolistar implements OnInit {
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();

    displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

    constructor(private uS: UsersService) {}

    ngOnInit(): void {
      this.uS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
      this.uS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
    eliminar(id: number) {
      this.uS.delete(id).subscribe((data) => {
        this.uS.list().subscribe(data=>{
          this.uS.setList(data)
        })
      });
    }
}
