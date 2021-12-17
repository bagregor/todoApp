import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constante';
import Hospitalisation from 'src/model/hospitalisation';

@Injectable({
  providedIn: 'root'
})
export class HospitalisationService {

  constructor(private http: HttpClient) { }

  getAllhospitalisations(): Observable<Hospitalisation[]> {
    return this.http.get<Hospitalisation[]>(SERVER_API_URL+'/v1/hospitalisations').pipe(
      map(hospitalisation  => {
        return hospitalisation;
      }),
      tap(
        _ => _,
        _ => _
      ));
  } 

  getHospitalisationByPatient(uidPatient: String): Observable<Hospitalisation[]> {
    return this.http.get<Hospitalisation[]>(SERVER_API_URL+`/v1/hospitalisationsForPatient/${uidPatient}`).pipe(
      map(hospitalisation  => {
        return hospitalisation;
      }),
      tap(
        _ => _,
        _ => _
      ));
  } 

}
