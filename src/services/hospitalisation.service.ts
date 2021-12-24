import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constante';
import Hospitalisation from 'src/model/hospitalisation';

@Injectable({
  providedIn: 'root'
})
export class HospitalisationService {

  headers: HttpHeaders;

  constructor(private http : HttpClient) { 
    const token = localStorage.getItem('currentUser');
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    

  }

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

  getAllHospitalisaForMedecin(): Observable<Hospitalisation[]> {
    return this.http.get<Hospitalisation[]>(SERVER_API_URL+'/v1/hospitalisationsForMedecin').pipe(
      map(hospitalisations => {
        return hospitalisations;
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

  addHospitalisation(hospitalisation: Hospitalisation){
    return this.http.post(SERVER_API_URL+'/v1/hospitalisations', hospitalisation,{headers: this.headers});
}


//Cette fonction ne supprime pas,
//elle permet de faire sortir un patient hospitaliser
removeHospitalisation(hospitalisation: Hospitalisation){
  return this.http.put(SERVER_API_URL+'/v1/removeHospitalisation', hospitalisation,{headers: this.headers});
}

}
