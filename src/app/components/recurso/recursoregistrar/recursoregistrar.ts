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
import { Recurso } from '../../../models/Recurso';
import { Users } from '../../../models/Users';
import { RecursoService } from '../../../services/recurso-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../../../services/users-service';

@Component({
  selector: 'app-recursoregistrar',
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  MatTimepickerModule,
    MatSelectModule,],
  templateUrl: './recursoregistrar.html',
      providers: [provideNativeDateAdapter()],
  styleUrl: './recursoregistrar.css',
})
export class Recursoregistrar implements OnInit{
form: FormGroup = new FormGroup({});
  re: Recurso = new Recurso();
  listaUsuarios: Users[] = [];
  edicion: boolean = false;
  id: number = 0;
   tipos: { value: string; viewValue: string }[] = [
    { value: "Libro", viewValue: "Libro" },
    { value: "Video", viewValue: "Video" },
  ];
   nivel: { value: string; viewValue: string }[] = [
    { value: "Principiante", viewValue: "Principiante" },
    { value: "Intermedio", viewValue: "Intermedio" },
    { value: "Avanzado", viewValue: "Avanzado" },
  ];
   constructor(
    private rS: RecursoService,
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
      titulo: ['',  [Validators.required, Validators.maxLength(50)]],
      descripcion: ['',[Validators.required, Validators.maxLength(100)]],
      tipo: ['', Validators.required],
      nivel: ['', Validators.required],
      url: ['', [Validators.required, Validators.maxLength(100)]],
      fk:['',Validators.required]
    });

  }
  cancelar() {
  this.router.navigate(['/recursosducativos']);
}

  aceptar(): void {
    if (this.form.valid) {
      this.re.idRecurso=this.form.value.codigo
      this.re.tituloRecurso = this.form.value.titulo;
      this.re.descripcionRecurso = this.form.value.descripcion;
      this.re.tipoRecurso = this.form.value.tipo;
      this.re.nivelRecurso = this.form.value.nivel;
      this.re.urlRecurso = this.form.value.url;
      this.re.usuario.id=this.form.value.fk

      if(this.edicion){
        this.rS.update(this.re).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }else{
        this.rS.insert(this.re).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['recursosducativos']);
    }
    
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRecurso),
          titulo: new FormControl(data.tituloRecurso),
          descripcion: new FormControl(data.descripcionRecurso),
          tipo: new FormControl(data.tipoRecurso),
          nivel: new FormControl(data.nivelRecurso),
          url: new FormControl(data.urlRecurso),
          fk: new FormControl(data.usuario.id)
        });
      });
    }
  }




  }



