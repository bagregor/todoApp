import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/model/account';
import { AuthenticationService } from 'src/services/authentication.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

  accounts! : Accounts;
  email= localStorage.getItem("email");

  authorities!: String;

  constructor(private authenticationService : AuthenticationService, private userService : UsersService) { }

  ngOnInit(): void {
    this.getInfoAccount(localStorage.getItem("email")!);

  }

  logout(){
    this.authenticationService.logout();
  }


  getInfoAccount(email: String){

    console.log("le email "+localStorage.getItem("email")!)
    this.userService.getCurrentUserConnected(email).pipe().subscribe( account => {
           this.accounts = account;
           this.authorities = account.authorities;
           return this.accounts;
      });
  }
}
