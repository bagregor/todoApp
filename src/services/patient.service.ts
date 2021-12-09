import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constante';
import { Patient } from 'src/model/patient';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  headers: HttpHeaders;
  user!: User;

  constructor(private http : HttpClient) { 
    const token = localStorage.getItem('currentUser');
    //this.user = token;
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    //console.log("mon headers "+JSON.stringify(this.headers))
    //console.log("mon token "+token.accessToken)

  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(SERVER_API_URL+'/v1/patients',{headers: this.headers}).pipe(
      map(patients => {
        return patients;
      }),
      tap(
        _ => _,
        _ => _
      ));
  }  

  getPatientForMedecin(): Observable<Patient[]> {
    return this.http.get<Patient[]>(SERVER_API_URL+'/v1/getPatientForMedecin/',{headers: this.headers}).pipe(
      map(patients => {
        return patients;
      }),
      tap(
        _ => _,
        _ => _
      ));
  }


  addPatient(patient: Patient){
      return this.http.post(SERVER_API_URL+'/v1/patient', patient,{headers: this.headers});
  }
  
  update(patient: Patient){
    return this.http.put(SERVER_API_URL+'/v1/patient', patient,{headers: this.headers});
  }

  deletePatient(uidPatient: String){
    return this.http.delete(SERVER_API_URL+'/v1/deletePatient/'+ uidPatient,{headers: this.headers});
  }

}


