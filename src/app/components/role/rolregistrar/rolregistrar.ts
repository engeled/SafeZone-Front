import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users-service';

@Component({
  selector: 'app-rolregistrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  MatTimepickerModule,
    MatSelectModule,],
  templateUrl: './rolregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './rolregistrar.css',
})
export class Rolregistrar implements OnInit{

form: FormGroup = new FormGroup({});
  ro: Role = new Role();
  edicion: boolean = false;
  id: number = 0;
  listaUsuarios: Users[] = [];

   constructor(
    private rS: RoleService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsersService,
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
      rol: ['', Validators.required],
      fk:['',Validators.required],
    });
  }
  cancelar() {
  this.router.navigate(['/roles']);
}

  aceptar(): void {
   if (this.form.valid) {
      this.ro.id = this.form.value.codigo;
      this.ro.rol = this.form.value.rol;
      this.ro.usuario.id=this.form.value.fk;

      if (this.edicion) {
        this.rS.update(this.ro).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.ro).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['roles']);
    }
  }

  init() {
  if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          rol: new FormControl(data.rol),
          fk: new FormControl(data.usuario.id)
        });
      });
    }
  }


}
