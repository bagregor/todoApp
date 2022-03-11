import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationRequest } from 'src/model/AuthenticationRequest';
import { SERVER_API_URL } from '../app/app.constante';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,private router: Router) {
        /* this.currentUserSubject = new BehaviorSubject<User>(localStorage.getItem('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable(); */
    }
   
    login(authenticationRequest : AuthenticationRequest) {
      return this.http.post(SERVER_API_URL+'/auth/login',authenticationRequest,{ responseType: 'text'});
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.router.navigateByUrl('');  

    } 

    isAuthenticated(): boolean {
        const user = localStorage.getItem('currentUser');
        return (user !== null) ? true : false;
      }


    
}
