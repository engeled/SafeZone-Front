import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { Recomendacion } from '../models/Recomendacion';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BuscarRecomendacionXCategoriaDTO } from '../models/BuscarRecomendacionXCategoriaDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class RecomendacionService implements OnInit{
  private url = `${base_url}/recomendaciones`;

  private listaCambio = new Subject<Recomendacion[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Recomendacion[]>(this.url);
  }

  insert(r: Recomendacion): Observable<string> {
    return this.http.post(this.url, r, { responseType: 'text' });
  }

  setList(listaNueva: Recomendacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Recomendacion>(`${this.url}/${id}`);
  }

  update(r: Recomendacion) {
    return this.http.put(`${this.url}`, r, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }
  buscarPorCategoria(categoria: string) {
  return this.http.get<BuscarRecomendacionXCategoriaDTO[]>(`${this.url}/buscarRecomendacionesporcategoria?categoria=${categoria}`);
}
}
