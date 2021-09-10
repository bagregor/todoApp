import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.sass']
})
export class RegisterUserComponent implements OnInit {

  users! : User[];
  constructor(private userService : UsersService) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }


  loadAllUsers(){
    this.userService.getAllUsers().pipe().subscribe(
        users => {
             this.users = users;
             return this.users;
        });
  }

}
