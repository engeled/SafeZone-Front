import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Archivos } from '../../../models/Archivos';
import { ArchivoService } from '../../../services/archivo-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users-service';

@Component({
  selector: 'app-archivoregistrar',
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './archivoregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './archivoregistrar.css',
})
export class Archivoregistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  arc: Archivos = new Archivos();
  edicion: boolean = false;
  id: number = 0;
  listaUsuarios: Users[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Imagen', viewValue: 'Imagen' },
    { value: 'Video', viewValue: 'Video' },
    { value: 'Texto', viewValue: 'Texto' },
  ];
  constructor(
    private aS: ArchivoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      fk: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.arc.idArchivos = this.form.value.codigo;
      this.arc.nombreArchivo = this.form.value.nombre;
      this.arc.tipoArchivo = this.form.value.tipo;
      this.arc.fechaArchivo = this.form.value.fecha;
      this.arc.usuario.id = this.form.value.fk;


      if (this.edicion) {
        this.aS.update(this.arc).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.arc).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['archivos']);
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idArchivos),
          nombre: new FormControl(data.nombreArchivo),
          tipo: new FormControl(data.tipoArchivo),
          fecha: new FormControl(data.fechaArchivo),
          fk: new FormControl(data.usuario.id),
        });
      });
    }
  }
}
