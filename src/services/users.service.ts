import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constante';
import { Accounts } from 'src/model/account';
import { Register } from 'src/model/register';
import { User } from 'src/model/user';
import { UserToModify } from 'src/model/userToModify';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  headers: HttpHeaders;

  constructor(private http : HttpClient) { 
    const token = localStorage.getItem('currentUser');
    //this.user = token;
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    //console.log("mon headers "+JSON.stringify(this.headers))
    //console.log("mon token "+token.accessToken)

  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(SERVER_API_URL+'/auth/users', {headers: this.headers}).pipe(
      map(users => {
        return users;
      }),
      tap(
        _ => _,
        _ => _
      ));
  } 


  getAllInfosUser(): Observable<User> {
    return this.http.get<User>(SERVER_API_URL+'/auth/infos', {headers: this.headers}).pipe(
      map(users => {
        return users;
      }),
      tap(
        _ => _,
        _ => _
      ));
  } 



  getAllMedecins(): Observable<User[]> {
    return this.http.get<User[]>(SERVER_API_URL+'/auth/medecins', {headers: this.headers}).pipe(
      map(users => {
        return users;
      }),
      tap(
        _ => _,
        _ => _
      ));
  } 


  register(register: Register) {
    return this.http.post(SERVER_API_URL+'/auth/signup', register, {headers: this.headers});
  }

  update(user: UserToModify) {
      return this.http.put(SERVER_API_URL+'/auth/users/', user, {headers: this.headers});
  }

  delete(uidUser : String) {
      return this.http.delete(SERVER_API_URL+'/auth/users/'+uidUser, {headers: this.headers});
  }

  getCurrentUserConnected(email: String)  {
    return this.http.get<Accounts>(SERVER_API_URL+'/v1/user/currentUser'+email, {headers: this.headers}).pipe(
        map(account => {
          return account;
      }),
        tap(
          _ => _,
          _ => _
      ));
}
}
