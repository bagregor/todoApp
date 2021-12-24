import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    /* canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //const currentUser = this.authenticationService.currentUserValue;
        const currentUser = localStorage.getItem("currentUser");

        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    } */

    canActivate(): boolean {
        if (!this.authenticationService.isAuthenticated()) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      }
}
