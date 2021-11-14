import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constante';
import { Consultation } from 'src/model/consultation';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http : HttpClient) { }

  getAllConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(SERVER_API_URL+'/v1/consultations').pipe(
      map(consultation  => {
        return consultation;
      }),
      tap(
        _ => _,
        _ => _
      ));
  } 

  getConsultationByPatient(uidPatient: String): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(SERVER_API_URL+'/v1/getConsultationByPatient'+ uidPatient).pipe(
      map(consultation  => {
        return consultation;
      }),
      tap(
        _ => _,
        _ => _
      ));
  } 

  getConsultationByMedecin(uidMedecin: String): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(SERVER_API_URL+'/v1/getConsultationByMedecin/'+ uidMedecin).pipe(
      map(consultation  => {
        return consultation;
      }),
      tap(
        _ => _,
        _ => _
      )); 
  } 

  getConsultationByPatientAndMedecin(uidPatient: String, uidMedecin: String): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(SERVER_API_URL+'/v1/getConsultationByMedecin'+ uidPatient + uidMedecin).pipe(
      map(consultation  => {
        return consultation;
      }),
      tap(
        _ => _,
        _ => _
      ));
  } 

  addConsulation(consulation: Consultation){
      return this.http.post(SERVER_API_URL+'/v1/consultations', consulation);
  }
  
  updateConsulation(consulation: Consultation){
    return this.http.put(SERVER_API_URL+'/v1/updateConsultations', consulation);
  }

  deleteConsulation(uidConsulation: String){
    return this.http.delete(SERVER_API_URL+'/v1/deleteConsultation/'+ uidConsulation);
  }

}
