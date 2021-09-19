import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constante';
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
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token?.slice(1, -1));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(SERVER_API_URL+'/admin/users', {headers: this.headers}).pipe(
      map(users => {
        return users;
      }),
      tap(
        _ => _,
        _ => _
      ));
  }

  register(register: Register) {
    return this.http.post(SERVER_API_URL+'/admin/users', register, {headers: this.headers});
  }

  update(user: UserToModify) {
      return this.http.put(SERVER_API_URL+'/admin/users/', user, {headers: this.headers});
  }

  delete() {
      return this.http.delete(SERVER_API_URL+'/users/${id}', {headers: this.headers});
  }
}
