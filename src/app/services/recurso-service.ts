import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recurso } from '../models/Recurso';
import { Observable, Subject } from 'rxjs';
import { RecursoQuery2DTO } from '../models/RecursoQuery2DTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RecursoService implements OnInit {
  private url = `${base_url}/recursosducativos`;

  private listaCambio = new Subject<Recurso[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  list() {
    return this.http.get<Recurso[]>(this.url);
  }

  insert(r: Recurso): Observable<string> {
    return this.http.post(this.url, r, { responseType: 'text' });
  }

  setList(listaNueva: Recurso[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Recurso>(`${this.url}/${id}`);
  }

  update(r: Recurso) {
    return this.http.put(`${this.url}`, r, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  search(id: number): Observable<Recurso> {
    return this.http.get<Recurso>(`${this.url}/${id}`);
  }
  query1(tipo: string, nivel: string): Observable<Recurso> {
    let parametros = new HttpParams();
    if (tipo) {
      parametros = parametros.set('tipo', tipo);
    }
    if (nivel) {
      parametros = parametros.set('nivel', nivel);
    }

    return this.http.get<Recurso>(`${this.url}/bsuquedatipoynivel`, { params: parametros });
  }
  getCount(username: string): Observable<RecursoQuery2DTO[]> {
    return this.http.get<RecursoQuery2DTO[]>(
      `${this.url}/cantidadrecursoxusername?username=${username}`
    );
  }
}
