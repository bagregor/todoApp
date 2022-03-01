import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Facture from 'src/model/facture';
import { SERVER_API_URL } from 'src/app/app.constante';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  
  headers: HttpHeaders;

  constructor(private http : HttpClient) { 
    const token = localStorage.getItem('currentUser');
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    

  }

  getAllFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(SERVER_API_URL+'/v1/factures').pipe(
      map(factures  => {
        return factures;
      }),
      tap(
        _ => _,
        _ => _
      ));
  } 

  updateFacture(facture: Facture){
    return this.http.put(SERVER_API_URL+'/v1/updateFactures', facture,{headers: this.headers});
}

  deleteFacture(uidFacture: String){
    return this.http.delete(SERVER_API_URL+'/v1/deleteFactures'+ uidFacture,{headers: this.headers});
}

  addFature(facture: Facture){
      return this.http.post(SERVER_API_URL+'/v1/factures', facture,{headers: this.headers});
  }
}
