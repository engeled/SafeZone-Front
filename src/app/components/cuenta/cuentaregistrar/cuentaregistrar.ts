import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


import { Cuenta } from '../../../models/Cuenta';
import { CuentaService } from '../../../services/cuenta-service';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users-service';

@Component({
  selector: 'app-cuentaregistrar',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatDatepickerModule, MatButtonModule, MatSelectModule, RouterLink
  ],
  templateUrl: './cuentaregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./cuentaregistrar.css'],
})
export class CuentaRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cuenta: Cuenta = new Cuenta();
  edicion: boolean = false;
  id: number = 0;


  listaUsuarios: Users[] = [];
  listaEstados = [
    { value: true, viewValue: 'Activo' },
    { value: false, viewValue: 'Inactivo' },
  ];

  constructor(
    private cS: CuentaService,
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      codigo: [''],
      nombreCuenta: ['', Validators.required],
      servicioCuenta: ['', Validators.required],
      estadoCuenta: [true, Validators.required],
      fecharegistroCuenta: [new Date(), Validators.required],
      usuario: ['', Validators.required],
    });


    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });


    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;

      if (this.edicion) {
        this.init();
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cuenta.idCuenta = this.edicion ? this.id : 0;
      this.cuenta.nombreCuenta = this.form.value.nombreCuenta;
      this.cuenta.servicioCuenta = this.form.value.servicioCuenta;
      this.cuenta.estadoCuenta = this.form.value.estadoCuenta;
      this.cuenta.fecharegistroCuenta = this.form.value.fecharegistroCuenta;


      this.cuenta.usuario = new Users();
      this.cuenta.usuario.id = this.form.value.usuario;

      if (this.edicion) {
        this.cS.update(this.cuenta).subscribe(() => {
          this.cS.list().subscribe(data => this.cS.setList(data));
          this.router.navigate(['/cuentas/listar']);
        });
      } else {
        this.cS.insert(this.cuenta).subscribe(() => {
          this.cS.list().subscribe(data => this.cS.setList(data));
          this.router.navigate(['/cuentas/listar']);
        });
      }
    }
  }

  init() {

    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idCuenta,
        nombreCuenta: data.nombreCuenta,
        servicioCuenta: data.servicioCuenta,
        estadoCuenta: data.estadoCuenta,
        fecharegistroCuenta: new Date(data.fecharegistroCuenta),
        usuario: data.usuario.id
      });
    });
  }
}
