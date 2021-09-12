import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
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

  openDialogForAddUser(){
    console.log("Im in modal for add user")
    /* let dialogRef = this.dialog.open(DialogMessageComponent, {
      data: { data : id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); */
  }

}
