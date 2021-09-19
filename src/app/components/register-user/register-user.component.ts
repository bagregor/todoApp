import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { UsersService } from 'src/services/users.service';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/model/register';
import { Authority } from 'src/app/config/authority.constants'
import { UserToModify } from 'src/model/userToModify';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  users! : User[];

  userToModify! : User;


  modalAddUser : Modal | undefined;

  modalUpdateUser : Modal | undefined;


  authoritiesEnum = Authority;

  isRegister = false;

  isError = false;
  
 listRole : Array<string> = []; 

  signUpForm = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    login: [''],
    password: [''],
    firstName: [''],
    lastName: [''],
    roleUser: [''],
    langKey:  ['fr'],

  });

  modifUserForm! : FormGroup;
  
  register! : Register;

  user! : UserToModify;

  constructor(private userService : UsersService, private formBuilder: FormBuilder) { }

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


  getEditFormData() {
    return this.modifUserForm?.controls;
  }

  openDialogForAddUser(){
    this.modalAddUser = new bootstrap.Modal(document.getElementById('modalAdduser')!, {
      keyboard : false
    })

    this.modalAddUser?.show();
  }

  openDialogForUpdate(user : User){
    console.log("le us "+JSON.stringify(user))
    this.userToModify = user;

    this.modifUserForm = this.formBuilder.group({
      id: [this.userToModify?.id],
      email: [this.userToModify?.email ],
      login: [this.userToModify?.login],
      firstName: [this.userToModify?.firstName],
      lastName: [this.userToModify?.lastName],
      roleUser: [this.userToModify?.authorities],
  
    }); 
   
    this.modalUpdateUser = new bootstrap.Modal(document.getElementById('modalUpdateUser')!, {
      keyboard : false
    })

    this.modalUpdateUser?.show();
  }

  get f() { return this.signUpForm.controls; }

  saveUser(){

    this.register = this.signUpForm.value;
    this.userService.register(this.register)
            .pipe()
            .subscribe(
                () => {
                  this.isRegister = true;
                  setTimeout( () => {
                    console.log('hide');
                    this.isRegister = false; // here... this has different context
                  }, 2000);

                  this.loadAllUsers();
                  this.modalAddUser?.hide();
                    
                },
                error => {
                 
                  this.isError = true;
                  setTimeout( () => {
                    this.isError = false; // here... this has different context
                  }, 2000);

                  this.loadAllUsers();
                  this.modalAddUser?.hide()
                }); 
    }


    modifyUser(){
      this.user = this.modifUserForm?.value;

      this.userService.update(this.user)
      .pipe()
      .subscribe(
          () => {
            this.isRegister = true;
            setTimeout( () => {
              console.log('hide');
              this.isRegister = false; // here... this has different context
            }, 2000);

            this.loadAllUsers();
            this.modalUpdateUser?.hide();
              
          },
          error => {
           
            this.isError = true;
            setTimeout( () => {
              console.log('hide');
              this.isError = false; // here... this has different context
            }, 2000);

            this.loadAllUsers();
            this.modalUpdateUser?.hide()
          }); 
    }

}
