import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Accounts } from 'src/model/account';
import { AuthenticationService } from 'src/services/authentication.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'clinicappfront';

  

  constructor(private router : Router) { }

  ngOnInit(): void {
   /* const id_token = localStorage.getItem('currentUser');
   if (id_token === null || id_token === undefined) {
    this.router.navigateByUrl('');
   } else {
    this.router.navigateByUrl('/acceuil');
   } */
   this.router.navigateByUrl('/acceuil');
  }

}
