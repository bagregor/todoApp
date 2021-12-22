import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constante';
import { Lit } from 'src/model/lit';

@Injectable({
  providedIn: 'root'
})
export class LitService {

  constructor(private http: HttpClient) { }

  getAllitsDisponibles(): Observable<Lit[]> {
    return this.http.get<Lit[]>(SERVER_API_URL+'/v1/lits').pipe(
      map(lits  => {
        return lits;
      }),
      tap(
        _ => _,
        _ => _
      ));
  } 



}
