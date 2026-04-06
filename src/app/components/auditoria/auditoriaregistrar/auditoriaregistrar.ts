import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auditoria } from '../../../models/Auditoria';
import { AuditoriaService } from '../../../services/auditoria-service';
import { Users } from '../../../models/Users';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { UsersService } from '../../../services/users-service';

@Component({
  selector: 'app-auditoriaregistrar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './auditoriaregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./auditoriaregistrar.css'],
})
export class AuditoriaRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  audit: Auditoria = new Auditoria();
  edicion: boolean = false;
  id: number = 0;

  // Listas
  listaUsuarios: Users[] = [];
  listaTipos: string[] = ['Interna', 'Externa', 'Seguridad', 'Financiera', 'Sistemas', 'Error', 'Reporte', 'Config'];

  constructor(
    private aS: AuditoriaService,
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });


    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });


    this.form = this.formBuilder.group({
      codigo: [''],
      tipoAuditoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaAuditoria: [new Date(), Validators.required],
      usuario: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.audit.idAuditoria = this.edicion ? this.id : 0;
      this.audit.tipoAuditoria = this.form.value.tipoAuditoria;
      this.audit.descripcion = this.form.value.descripcion;
      this.audit.fechaAuditoria = this.form.value.fechaAuditoria;


      this.audit.usuario = new Users();
      this.audit.usuario.id = this.form.value.usuario;

      if (this.edicion) {

        this.aS.update(this.audit).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });

          this.router.navigate(['/auditoria/listar']);
        });
      } else {

        this.aS.insert(this.audit).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });

          this.router.navigate(['/auditoria/listar']);
        });
      }
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {

        this.form.patchValue({
          codigo: data.idAuditoria,
          tipoAuditoria: data.tipoAuditoria,
          descripcion: data.descripcion,
          fechaAuditoria: new Date(data.fechaAuditoria),
          usuario: data.usuario.id
        });
      });
    }
  }
}
