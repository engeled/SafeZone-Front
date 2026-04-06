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
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-usuarioregistrar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './usuarioregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './usuarioregistrar.css',
})
export class Usuarioregistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  ur: Users = new Users();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      username: ['', Validators.required],
      contraseña: ['', Validators.required],
      estado: [false, Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ur.id = this.form.value.codigo;
      this.ur.username = this.form.value.username;
      this.ur.password = this.form.value.contraseña;
      this.ur.enabled = this.form.value.estado;
      this.ur.nombres = this.form.value.nombres;
      this.ur.apellidos = this.form.value.apellidos;
      this.ur.emailUser = this.form.value.email;
      this.ur.telefonoUser = this.form.value.telefono;

      if (this.edicion) {
        this.uS.update(this.ur).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.ur).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['usuarios']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          username: new FormControl(data.username),
          contraseña: new FormControl(data.password),
          estado: new FormControl(data.enabled),
          nombres: new FormControl(data.nombres),
          apellidos: new FormControl(data.apellidos),
          email: new FormControl(data.emailUser),
          telefono: new FormControl(data.telefonoUser),
        });
      });
    }
  }
}
