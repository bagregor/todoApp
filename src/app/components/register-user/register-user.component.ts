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

  modalDeleteUser : Modal | undefined;

  loginUserForDelete!: String;

  authoritiesEnum = Authority;

  isRegister = false;

  isError = false;
  
 listRole : Array<string> = []; 

  signUpForm = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    username: [''],
    role: [''],
    password: [''],
    lastName: [''],
    numeroTelephone: [''],
    firstName:  [''],

  });
  
  roleuser = new Array();
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
    this.userToModify = user;

    this.modifUserForm = this.formBuilder.group({
      uidUser: [this.userToModify?.uidUser],
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

  openDialogForDeleteUser(user : User){

    this.loginUserForDelete = user?.uidUser;
    //console.log("le user to delete est le "+this.loginUserForDelete)

    this.modalDeleteUser = new bootstrap.Modal(document.getElementById('modalDeleteUser')!, {
      keyboard : false
    })

    this.modalDeleteUser?.show();
  }

  get f() { return this.signUpForm.controls; }

  saveUser(){    

    this.register = this.signUpForm.value;
    //this.roleuser.push(this.signUpForm.value.role);
    //console.log("le register list "+this.register)
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
                _error => {
                 
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

      console.log("Le user to modify "+JSON.stringify(this.user))

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

    deleteCompte(uidUser : String){

      this.userService.delete(uidUser)
      .pipe()
      .subscribe(
          () => {
            this.isRegister = true;
            setTimeout( () => {
              console.log('hide');
              this.isRegister = false; // here... this has different context
            }, 2000);

            this.loadAllUsers();
            this.modalDeleteUser?.hide();
              
          },
          error => {
           
            this.isError = true;
            setTimeout( () => {
              console.log('hide');
              this.isError = false; // here... this has different context
            }, 2000);

            this.loadAllUsers();
            this.modalDeleteUser?.hide()
          }); 
    }
    
}
