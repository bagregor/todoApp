import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    ) {
      
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

          if (this.f.username.value === "admin" && this.f.password.value === "admin") {
            console.log("Im here aceuil")

            this.router.navigateByUrl(this.returnUrl || 'acceuil');
          }else {

              console.log("Une erreur s'est produite");
          }
        
        }
    }

}
