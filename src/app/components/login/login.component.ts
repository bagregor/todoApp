import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/_guards/auth.guard';
import { AuthenticationRequest } from 'src/model/AuthenticationRequest';
import { User } from 'src/model/user';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
  styleUrls: ['../../../../src/assets/dist/css/app.css']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    returnUrl: "/acceil" | undefined;
    errorString: string | undefined;

    authenticationRequest! : AuthenticationRequest;
    user!: User;

    constructor(
      private formBuilder: FormBuilder,
       private router: Router,
       private authenticationService : AuthenticationService
    ) {
      //if (this.authenticationService.currentUserValue) { 
     //   this.router.navigate(['/']);
     // }
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]});
  }

  get f() { return this.loginForm.controls; }

    onSubmit() {
        // stop here if form is invalid
        //console.log("Im here")
        if (this.loginForm.invalid) {
            console.log('Veuillez saisir des infos valides!');
        } else {
          this.authenticationRequest = this.loginForm.value;
        
          this.authenticationService.login(this.authenticationRequest)
          .subscribe((data)=>{
            console.log("data to store "+JSON.stringify(data));
            if (data) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', data);
              this.router.navigateByUrl('/acceuil');
              //window.location.reload();
          }
          })  
        
        }
    }

}
