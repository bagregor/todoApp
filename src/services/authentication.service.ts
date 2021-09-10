import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Accounts } from 'src/model/account';
import { User } from 'src/model/user';
import { SERVER_API_URL } from '../app/app.constante';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

    constructor(private http: HttpClient,private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }
   

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

        return this.http.post<any>(SERVER_API_URL+'/authenticate', { username, password })
            .pipe(map(user => {
               
                // login successful if there's a jwt token in the response
                if (user && user.id_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.id_token));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
        this.router.navigateByUrl('/login');

    } 


    getCurrentUserConnected() {
        var header = {
            headers: new HttpHeaders()
              .set('Authorization',  `Bearer ${localStorage.getItem('currentUser')?.slice(1, -1)}`)
          }
        
        return this.http.get<Accounts>(SERVER_API_URL+ '/account', header);
        
    }
}
