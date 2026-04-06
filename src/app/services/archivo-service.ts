import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { Archivos } from '../models/Archivos';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BuscarArchivoXFechaDTO } from '../models/BuscarArchivoXFechaDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ArchivoService implements OnInit {
  private url = `${base_url}/archivos`;

  private listaCambio = new Subject<Archivos[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Archivos[]>(this.url);
  }

  insert(a: Archivos): Observable<string> {
    return this.http.post(this.url, a, { responseType: 'text' });
  }

  setList(listaNueva: Archivos[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Archivos>(`${this.url}/${id}`);
  }

  update(a: Archivos) {
    return this.http.put(`${this.url}`, a, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  buscarPorFechas(fechaInicio: string, fechaFin: string) {
    return this.http.get<BuscarArchivoXFechaDTO[]>(`${this.url}/BuscarArchivosXFecha`, {
      params: { fechaInicio, fechaFin },
    });
  }
}
