import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constante';
import { Patient } from 'src/model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  headers: HttpHeaders;

  constructor(private http : HttpClient) { 
    const token = localStorage.getItem('currentUser');
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(SERVER_API_URL+'/v1/patients').pipe(
      map(patients => {
        return patients;
      }),
      tap(
        _ => _,
        _ => _
      ));
  }


  addPatient(patient: Patient){
      return this.http.post(SERVER_API_URL+'/v1/patient', patient);
  }
  
  update(patient: Patient){
    return this.http.put(SERVER_API_URL+'/v1/patient', patient);
  }

  deletePatient(uidPatient: String){
    return this.http.delete(SERVER_API_URL+'/v1/deletePatient/'+ uidPatient);
  }

}


