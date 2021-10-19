import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Accounts } from 'src/model/account';
import { AuthenticationRequest } from 'src/model/AuthenticationRequest';
import { User } from 'src/model/user';
import { SERVER_API_URL } from '../app/app.constante';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //private currentUserSubject: BehaviorSubject<User>;
  //public currentUser: Observable<User>;

    constructor(private http: HttpClient,private router: Router) {
        /* this.currentUserSubject = new BehaviorSubject<User>(localStorage.getItem('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable(); */
    }
   

    //public get currentUserValue(): User {
      //  return this.currentUserSubject.value;
    //}

    login(authenticationRequest : AuthenticationRequest) {

        /* return this.http.post<any>(SERVER_API_URL+'/v1/user/authenticate', authenticationRequest)
            .pipe(map(user => {
               
                // login successful if there's a jwt token in the response
                if (user && user.id_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.id_token));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));   */
            //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
            return this.http.post(SERVER_API_URL+'/v1/user/authenticate',authenticationRequest,{ responseType: 'text'});

        //return this.http.post<any>(SERVER_API_URL+'/v1/user/authenticate', authenticationRequest);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.clear();
       // this.currentUserSubject.next(null!);
        this.router.navigateByUrl('');  

    } 


    
}
