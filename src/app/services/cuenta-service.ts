import { Injectable } from '@angular/core';
import { Cuenta } from '../models/Cuenta';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CuentaService {
   private url = `${base_url}/cuentas`;

  private listaCambio = new Subject<Cuenta[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  list() {
    return this.http.get<Cuenta[]>(this.url);
  }

  insert(c: Cuenta): Observable<string> {
    return this.http.post(this.url, c, { responseType: 'text' });
  }

  setList(listaNueva: Cuenta[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Cuenta>(`${this.url}/${id}`);
  }

  update(c: Cuenta) {
    return this.http.put(`${this.url}`, c, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  buscarCuentasActivas(id: number, fecha: string): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.url}/activas-usuario-fecha?id=${id}&fecha=${fecha}`);
  }
}
