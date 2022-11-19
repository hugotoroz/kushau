import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  getUsers(): Observable<any> { return this.http.get(this.apiUsers + '/users/').pipe(retry(3)); }
  getAutos(): Observable<any> { return this.http.get(this.apiAutos + '/autos/').pipe(retry(3)); }

  constructor(private http: HttpClient) { }
  apiUsers = 'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos';
  apiAutos = 'https://my-json-server.typicode.com/victorrosendo/repoListadoAutos'

  getUsuarios(){
    return this.http.get('https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos')
  }
}
