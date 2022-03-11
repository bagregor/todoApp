import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = localStorage.getItem('currentUser');
        const currentUser = JSON.parse(token!);
        const tokenN = currentUser?.token;
        const user_id = currentUser?.user.id;

    
        if (tokenN != null && user_id) {
          authReq = req.clone({
            headers: req.headers
              .set("Authorization", 'Bearer ' + tokenN)
              .set("user-id", '' + user_id),
          });
        }
        return next.handle(authReq);
      }

    
    

}