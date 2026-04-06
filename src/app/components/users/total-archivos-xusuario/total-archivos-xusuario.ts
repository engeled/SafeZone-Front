import { Component } from '@angular/core';
import { TotalArchivosXUsuarioDTO } from '../../../models/TotalArchivosXUsuarioDTO';
import { UsersService } from '../../../services/users-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-total-archivos-xusuario',
  imports: [CommonModule],
  templateUrl: './total-archivos-xusuario.html',
  styleUrl: './total-archivos-xusuario.css',
})
export class TotalArchivosXUsuario {
   data: TotalArchivosXUsuarioDTO[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMessage = null;
    this.usersService.getTotalArchivosPorUsuario().subscribe({
      next: (res) => {

        if (res && res.length > 0 && Array.isArray(res[0])) {
          this.data = (res as any[]).map((r: any) => ({
            username: r[0],
            totalArchivos: Number(r[1])
          }));
        } else {
          this.data = res as TotalArchivosXUsuarioDTO[];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando total archivos por usuario', err);
        this.errorMessage = 'Error al cargar datos';
        this.loading = false;
      }
    });
  }
}
