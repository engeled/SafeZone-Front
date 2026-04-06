import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { Role } from '../models/Role';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
const base_url=environment.base;

@Injectable({
  providedIn: 'root',
})
export class RoleService implements OnInit {
  
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Role[]>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Role[]>(this.url);
  }

  insert(r: Role): Observable<string> {
    return this.http.post(this.url, r, { responseType: 'text' });
  }

  setList(listaNueva: Role []) {
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }
    update(r: Role) {
    return this.http.put(`${this.url}`, r, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }
}
