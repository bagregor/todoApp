import { Component, Input, OnInit } from '@angular/core';
//import { Accounts } from 'src/model/account';
import { User } from 'src/model/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

  userInfos! : User;

  authorities!: string;

  constructor(private authenticationService : AuthenticationService, private userService : UsersService) { }

  ngOnInit(): void {
    this.getInfoAccount();

  }

  logout(){
    this.authenticationService.logout();
  }


  getInfoAccount(){

    this.userService.getAllInfosUser().pipe().subscribe( user => {
           this.userInfos = user;
           this.authorities = user.roles;
           localStorage.setItem('role_user', this.authorities);
           return this.userInfos;
      });
  }
}

