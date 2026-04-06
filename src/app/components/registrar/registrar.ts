import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users-service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Users } from '../../models/Users';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, CommonModule,RouterModule    ],
  templateUrl: './registrar.html',
  styleUrl: './registrar.css',
})
export class Registrar implements OnInit {
   form: FormGroup = new FormGroup({});
  ur: Users = new Users();
  edicion: boolean = false;
  id: number = 0;
  hidePassword: boolean = true;

  constructor(
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [false],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ur.id = this.form.value.codigo;
      this.ur.username = this.form.value.username;
      this.ur.password = this.form.value.password;
      this.ur.enabled = this.form.value.enabled;
      this.ur.nombres = this.form.value.nombres;
      this.ur.apellidos = this.form.value.apellidos;
      this.ur.emailUser = this.form.value.email;
      this.ur.telefonoUser = this.form.value.telefono;

      if (this.edicion) {
        this.uS.update(this.ur).subscribe(() => this.afterSave('Usuario actualizado correctamente'));
      } else {
        this.uS.insert(this.ur).subscribe(() => this.afterSave('Usuario registrado exitosamente'));
      }
    } else {
      this.snack.open('Completa todos los campos correctamente', 'Cerrar', { duration: 2500 });
    }
  }

  afterSave(msg: string) {
    this.uS.list().subscribe(data => this.uS.setList(data));
    this.snack.open(msg, 'OK', { duration: 3000 });
    this.router.navigate(['login']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
        this.form.patchValue({
          codigo: data.id,
          username: data.username,
          password: '',
          enabled: data.enabled,
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.emailUser,
          telefono: data.telefonoUser
        });
      });
    }
  }
}
