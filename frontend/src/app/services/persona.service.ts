import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService
{

  private myAppURL: string;
  private myApiURL: string;

  constructor(private http: HttpClient)
  {
    this.myAppURL = environment.endpoint;
    this.myApiURL = 'api/users';
  }

  // registrar usuario (sign in)
  registrar(usuario: User): Observable<any>
  {
    return this.http.post<any>(this.myAppURL + this.myApiURL, usuario)
  }

  eliminar(id: number): Observable<void>
  {
    return this.http.delete<void>(`${this.myAppURL}${this.myApiURL}${id}`)
  }

  ingresar(usuario: User): Observable<string>
  {
    return this.http.post<string>(`${this.myAppURL}${this.myApiURL}/login`, usuario)
  }

}
