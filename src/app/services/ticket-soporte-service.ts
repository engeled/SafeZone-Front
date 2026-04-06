import { Injectable } from '@angular/core';
import { TicketSoporte } from '../models/TicketSoporte';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CantidadRespuestaTicket } from '../models/CantidadRespuestaTicket';
import { ContarTicketsPorUsuario } from '../models/ContarTicketsPorUsuario';
import { environment } from '../../environment/environment';
const base_url=environment.base


@Injectable({
  providedIn: 'root',
})
export class TicketSoporteService {
  
  private url=`${base_url}/ticketreportes`

  private listaCambio=new Subject<TicketSoporte[]>();

  constructor(private http:HttpClient){}
  
  ngOnInit(): void {}
  list() {
    return this.http.get<TicketSoporte[]>(this.url);
  }

  insert(t:TicketSoporte):Observable<string>{
    return this.http.post(this.url,t,{responseType:'text'});
  }

  setList(listaNueva:TicketSoporte[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  listId(id:number){
    return this.http.get<TicketSoporte>(`${this.url}/${id}`);
  }

  update(t:TicketSoporte){
    return this.http.put(`${this.url}`,t,{responseType:'text'});
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'})
  }

  getCantidad():Observable<CantidadRespuestaTicket[]>{
    return this.http.get<CantidadRespuestaTicket[]>(`${this.url}/CantidadRespuestas`);
  }

  getContar():Observable<ContarTicketsPorUsuario[]>{
    return this.http.get<ContarTicketsPorUsuario[]>(`${this.url}/ContarTicktesPorUsuario`)
  }
}
