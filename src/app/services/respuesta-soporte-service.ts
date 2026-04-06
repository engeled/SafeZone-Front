import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { RespuestaSoporte } from '../models/RespuestaSoporte';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
const base_url=environment.base

@Injectable({
  providedIn: 'root',
})
export class RespuestaSoporteService implements OnInit{
   private url=`${base_url}/RespuestaSoporte`;
  private listaCambio=new Subject<RespuestaSoporte[]>();
  constructor(private http:HttpClient){}

  ngOnInit(): void {}
  list() {
    return this.http.get<RespuestaSoporte[]>(this.url);
  }

  insert(r: RespuestaSoporte): Observable<string> {
    return this.http.post(this.url, r, { responseType: 'text' });
  }

  setList(listaNueva: RespuestaSoporte[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<RespuestaSoporte>(`${this.url}/${id}`);
  }

  update(r: RespuestaSoporte) {
    return this.http.put(`${this.url}`, r, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }
}
