import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/_guards/auth.guard';
import { AuthenticationRequest } from 'src/model/AuthenticationRequest';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    returnUrl: "/acceil" | undefined;
    errorString: string | undefined;

    authenticationRequest! : AuthenticationRequest;

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
        console.log("Im here")
        if (this.loginForm.invalid) {
            console.log('Veuillez saisir des infos valides!');
        } else {
          this.authenticationRequest = this.loginForm.value;
          console.log("Im here 2")
          localStorage.setItem("email", this.loginForm.value.username)

          this.authenticationService.login(this.authenticationRequest)
          .subscribe((data)=>{
            console.log("hhhhhhhh "+data);
            if (data) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', data);
              this.router.navigateByUrl('/acceuil');
              window.location.reload();
          }
          })  
              /* .pipe()
              .subscribe(
                  () => {
  
                      this.router.navigateByUrl('/acceuil');
                      window.location.reload();
                  },
                  error => {
                   
                    this.errorString = JSON.stringify(error.status);
                   
                    if(!(this.errorString.localeCompare(JSON.stringify(error.status))) == true){
                  
                      console.error('Les identifications sont erronées !');
                    }
  
            }); */
        
        }
    }

}
