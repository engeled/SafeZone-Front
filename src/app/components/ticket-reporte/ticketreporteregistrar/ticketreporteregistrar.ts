import { Component, OnInit } from '@angular/core';
import { Users } from '../../../models/Users';
import { TicketSoporte } from '../../../models/TicketSoporte';
import{FormBuilder,FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms'
import { TicketSoporteService } from '../../../services/ticket-soporte-service';
import { UsersService } from '../../../services/users-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ticketreporteregistrar',
  imports: [ReactiveFormsModule,MatInputModule, MatFormFieldModule,MatRadioModule,MatDatepickerModule,MatButtonModule,MatSelectModule,MatDatepickerModule, MatNativeDateModule,MatIconModule],
  templateUrl: './ticketreporteregistrar.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './ticketreporteregistrar.css',
})
export class Ticketreporteregistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  ticket: TicketSoporte = new TicketSoporte();
  edicion: boolean = false;
  id: number = 0;
  listaUsuarios: Users[] = [];

  constructor(
    private tS: TicketSoporteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsersService,
    private location: Location
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
      tipo: ['', Validators.required],
      asunto: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      fechacreacion: ['', Validators.required],
      fk:['',Validators.required]
    });
  }
  aceptar():void{
    if(this.form.valid){
      this.ticket.idSoporte=this.form.value.codigo;
      this.ticket.tipoSoporte=this.form.value.tipo;
      this.ticket.asuntoSoporte=this.form.value.asunto;
      this.ticket.descripcionSoporte=this.form.value.descripcion;
      this.ticket.estadoSoporte=this.form.value.estado;
      this.ticket.fechacreacionSoporte=this.form.value.fechacreacion;
      this.ticket.usuario.id=this.form.value.fk
      if(this.edicion){
        this.tS.update(this.ticket).subscribe((data)=>{
          this.tS.list().subscribe((data)=>{
            this.tS.setList(data);
          });
        });
      }else{
        this.tS.insert(this.ticket).subscribe((data)=>{
          this.tS.list().subscribe((data)=>{
            this.tS.setList(data);
          });
        });
      }
      this.router.navigate(['ticketsoporte']);
    }
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idSoporte),
          tipo: new FormControl(data.tipoSoporte),
          asunto: new FormControl(data.asuntoSoporte),
          descripcion: new FormControl(data.descripcionSoporte),
          estado: new FormControl(data.estadoSoporte),
          fechacreacion: new FormControl(data.fechacreacionSoporte),
          fk:new FormControl(data.usuario.id)
        });
      });
    }
  }

  regresar(): void {
  this.location.back();
 }
}

