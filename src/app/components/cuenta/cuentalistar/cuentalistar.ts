import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // <--- Importante
import { Cuenta } from '../../../models/Cuenta';
import { CuentaService } from '../../../services/cuenta-service';

@Component({
  selector: 'app-cuentalistar',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './cuentalistar.html',
  styleUrls: ['./cuentalistar.css'],
})
export class Cuentalistar implements OnInit {
  dataSource: MatTableDataSource<Cuenta> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private cS: CuentaService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    if (confirm('¿Está seguro de eliminar esta cuenta?')) {
      this.cS.delete(id).subscribe(() => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
    }
  }
}
