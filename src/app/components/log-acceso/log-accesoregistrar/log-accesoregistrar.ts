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


import { LogAcceso } from '../../../models/LogAcceso';
import { LogAccesoService } from '../../../services/log-acceso-service';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users-service';

@Component({
  selector: 'app-logaccesoregistrar',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatDatepickerModule, MatButtonModule, RouterLink, MatSelectModule
  ],
  templateUrl: './log-accesoregistrar.html',
  styleUrls: ['./log-accesoregistrar.css'],
  providers: [provideNativeDateAdapter()],
})
export class LogAccesoRegistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  log: LogAcceso = new LogAcceso();
  edicion: boolean = false;
  id: number = 0;

  listaUsuarios: Users[] = [];

  constructor(
    private lS: LogAccesoService,
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      codigo: [''],
      fechaAcceso: [new Date(), Validators.required],
      ipAcceso: ['', Validators.required],
      navegadorAcceso: ['', Validators.required],
      sistemaoperativoAcceso: ['', Validators.required],
      usuario: ['', Validators.required],
    });


    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;


      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.edicion = params['id'] != null;

        if (this.edicion) {
          this.init();
        }
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.log.idLogAcceso = this.edicion ? this.id : 0;
      this.log.fechaAcceso = this.form.value.fechaAcceso;
      this.log.ipAcceso = this.form.value.ipAcceso;
      this.log.navegadorAcceso = this.form.value.navegadorAcceso;
      this.log.sistemaoperativoAcceso = this.form.value.sistemaoperativoAcceso;

      this.log.usuario = new Users();
      this.log.usuario.id = this.form.value.usuario;

      if (this.edicion) {
        this.lS.update(this.log).subscribe(() => {
          this.lS.list().subscribe(data => this.lS.setList(data));
          this.router.navigate(['/logacceso/listar']); // Redirige a listar
        });
      } else {
        this.lS.insert(this.log).subscribe(() => {
          this.lS.list().subscribe(data => this.lS.setList(data));
          this.router.navigate(['/logacceso/listar']); // Redirige a listar
        });
      }
    }
  }

  init() {
    this.lS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idLogAcceso,
        fechaAcceso: new Date(data.fechaAcceso),
        ipAcceso: data.ipAcceso,
        navegadorAcceso: data.navegadorAcceso,
        sistemaoperativoAcceso: data.sistemaoperativoAcceso,
        usuario: data.usuario.id, 
      });
    });
  }
}
