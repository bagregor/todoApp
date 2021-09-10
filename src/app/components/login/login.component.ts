import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/_guards/auth.guard';
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

    constructor(
      private formBuilder: FormBuilder,
       private router: Router,
       private authenticationService : AuthenticationService
    ) {
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
      }
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]});

      /* this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/forums'); */
  }

  get f() { return this.loginForm.controls; }

    onSubmit() {
        // stop here if form is invalid
        console.log("Im here")
        if (this.loginForm.invalid) {
            console.log('Veuillez saisir des infos valides!');
        } else {

          this.authenticationService.login(this.f.username.value, this.f.password.value)
              .pipe()
              .subscribe(
                  () => {
  
                      this.router.navigateByUrl('/acceuil');
                      //window.location.reload();
                  },
                  error => {
                   
                    this.errorString = JSON.stringify(error.status);
                   
                    if(!(this.errorString.localeCompare(JSON.stringify(error.status))) == true){
                  
                      console.error('Les identifications sont erronées !');
                    }
  
            });
        
        }
    }

}
