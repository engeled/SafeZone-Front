import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Recomendacion } from '../../../models/Recomendacion';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../../../services/users-service';
import { RecomendacionService } from '../../../services/recomendacion-service';
import { Users } from '../../../models/Users';

@Component({
  selector: 'app-recomendacionregistrar',
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
  templateUrl: './recomendacionregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './recomendacionregistrar.css',
})
export class Recomendacionregistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  rec: Recomendacion = new Recomendacion();
  edicion: boolean = false;
  id: number = 0;
  listaUsuarios: Users[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Software Updates', viewValue: 'Software Updates' },
    { value: 'Network Security', viewValue: 'Network Security' },
    { value: 'Backup & Recovery', viewValue: 'Backup & Recovery' },
    { value: 'Phishing Awareness', viewValue: 'Phishing Awareness' },
    { value: 'Malware Detection', viewValue: 'Malware Detection' },
    { value: 'Best Security Practices', viewValue: 'Best Security Practices' },

  ];
  constructor(
    private rS: RecomendacionService,
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
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      fk: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.rec.idRecomendacion = this.form.value.codigo;
      this.rec.tituloRecomendacion = this.form.value.titulo;
      this.rec.descripcionRecomendacion = this.form.value.descripcion;
      this.rec.categoriaRecomendacion = this.form.value.categoria;
      this.rec.usuario.id = this.form.value.fk;

      if (this.edicion) {
        this.rS.update(this.rec).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rec).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['recomendaciones']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRecomendacion),
          titulo: new FormControl(data.tituloRecomendacion),
          descripcion: new FormControl(data.descripcionRecomendacion),
          categoria: new FormControl(data.categoriaRecomendacion),
          fk: new FormControl(data.usuario.id),
        });
      });
    }
  }
}
