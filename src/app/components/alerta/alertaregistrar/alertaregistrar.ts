import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Alerta } from '../../../models/Alerta';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../../services/users-service';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSelectModule } from '@angular/material/select';
import { Users } from '../../../models/Users';
import { AlertaService } from '../../../services/alerta-service';


@Component({
  selector: 'app-alertaregistrar',
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  MatTimepickerModule,
    MatSelectModule],
  templateUrl: './alertaregistrar.html',
    providers: [provideNativeDateAdapter()],
  styleUrl: './alertaregistrar.css',
})
export class Alertaregistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  al: Alerta = new Alerta();
  listaUsuarios: Users[] = [];
  edicion: boolean = false;
  id: number = 0;
  tipos: { value: string; viewValue: string }[] = [
    { value: "Peligro bajo", viewValue: "Peligro bajo" },
    { value: "Peligro moderado", viewValue: "Peligro moderado" },
    { value: "Peligro bajo", viewValue: "Peligro bajo" },
  ];
  constructor(
    private aS: AlertaService,
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
    const now = new Date();
    const horaActual = now.toTimeString().slice(0, 8);
    this.form = this.formBuilder.group({
      codigo:[''],
      mensaje: ['',  [Validators.required, Validators.maxLength(50)]],
      tipo: ['', Validators.required],
      fecha: [new Date(), Validators.required],
      hora: [horaActual, Validators.required],
      visto: [false, Validators.required],
      fk:['',Validators.required]
    });
  }

cancelar() {
  this.router.navigate(['/alertas']);
}

  aceptar(): void {
    if (this.form.valid) {
      this.al.idAlerta=this.form.value.codigo
      this.al.mensajeAlerta = this.form.value.mensaje;
      this.al.tipoAlerta = this.form.value.tipo;
      this.al.fechaAlerta = this.form.value.fecha;
      this.al.horaAlerta = this.form.value.hora;
      this.al.vistoAlerta = this.form.value.visto;
      this.al.usuario.id=this.form.value.fk

      if(this.edicion){
        this.aS.update(this.al).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }else{
        this.aS.insert(this.al).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['alertas']);
    }
    
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idAlerta),
          mensaje: new FormControl(data.mensajeAlerta),
          tipo: new FormControl(data.tipoAlerta),
          fecha: new FormControl(data.fechaAlerta),
          hora: new FormControl(data.horaAlerta),
          visto: new FormControl(data.vistoAlerta),
          fk: new FormControl(data.usuario.id)
        });
      });
    }
  }
}
