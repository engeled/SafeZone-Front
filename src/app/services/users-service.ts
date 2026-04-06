import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { Users } from '../models/Users';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TotalArchivosXUsuarioDTO } from '../models/TotalArchivosXUsuarioDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnInit{
  private url = `${base_url}/usuarios`;

  private listaCambio = new Subject<Users[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Users[]>(this.url);
  }

  insert(u: Users): Observable<string> {
    return this.http.post(this.url, u, { responseType: 'text' });
  }

  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Users>(`${this.url}/${id}`);
  }

  update(u: Users) {
    return this.http.put(`${this.url}`, u, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }
   getTotalArchivosPorUsuario(): Observable<TotalArchivosXUsuarioDTO[]> {
    return this.http.get<TotalArchivosXUsuarioDTO[]>(`${this.url}/TotalArchivosPorUsuario`);
  }
}
