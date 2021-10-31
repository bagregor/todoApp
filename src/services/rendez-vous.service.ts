import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constante';
import { RendezVous } from 'src/model/rendezVous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http : HttpClient) { }

  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(SERVER_API_URL+'/v1/rendezVous').pipe(
      map(rendezVous => {
        return rendezVous;
      }),
      tap(
        _ => _,
        _ => _
      ));
  }


  addRendezVous(rendezVous: RendezVous){
      return this.http.post(SERVER_API_URL+'/v1/rendezVous', rendezVous);
  }
  
  updateRendezVous(rendezVous: RendezVous){
    return this.http.put(SERVER_API_URL+'/v1/rendezVous', rendezVous);
  }

  deleteRendezVous(uidRendezVous: String){
    return this.http.delete(SERVER_API_URL+'/v1/deleteRV/'+ uidRendezVous);
  }

}
