import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AuthGuardService } from './_guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagePrincipalComponent } from './components/page-principal/page-principal.component';
import { MedecinComponent } from './components/medecin/medecin.component';
import { PatientComponent } from './components/patient/patient.component';
import { SecretaireComponent } from './components/secretaire/secretaire.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MedecinComponent,
    PatientComponent,
    SecretaireComponent,
    LoginComponent,
    RegisterUserComponent,
    LayoutComponent,
    ProfileComponent,
    PagePrincipalComponent,
    PagePrincipalComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ErrorInterceptor, JwtInterceptor, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
