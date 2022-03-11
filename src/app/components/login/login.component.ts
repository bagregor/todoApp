import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/model/AuthenticationRequest';
import { User } from 'src/model/user';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  returnUrl: "/acceuil" | undefined;
  errorString: string | undefined;

  authenticationRequest!: AuthenticationRequest;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formcontrol() { return this.loginForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Veuillez saisir des infos valides!');
    } else {
      this.authenticationRequest = this.loginForm.value;
      console.log('Veuillez saisir des infos valides!');

      this.authenticationService.login(this.authenticationRequest).subscribe((data) => {

        if (data) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', data);
          this.router.navigateByUrl('/acceuil');
        }
      })

    }
  }

}
