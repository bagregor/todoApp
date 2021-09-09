import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuardService } from './_guards/auth.guard';
import { MedecinComponent } from './components/medecin/medecin.component';
import { PatientComponent } from './components/patient/patient.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SecretaireComponent } from './components/secretaire/secretaire.component';
import { PagePrincipalComponent } from './components/page-principal/page-principal.component';

const routes: Routes = [
  { path: 'medecin', component : MedecinComponent , canActivate: [AuthGuardService] },
  { path: 'patient', component : PatientComponent , canActivate: [AuthGuardService]},
  { path: 'register-user', component : RegisterUserComponent , canActivate: [AuthGuardService]},
  { path: 'profile', component : ProfileComponent , canActivate: [AuthGuardService]},
  { path: 'secretaire', component : SecretaireComponent , canActivate: [AuthGuardService]},
  { path: 'login', component : LoginComponent },
 // { path: 'acceuil', component : PagePrincipalComponent, canActivate: [AuthGuardService]},
  { path: 'acceuil', component : PagePrincipalComponent},
  { path: '', component : PagePrincipalComponent},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
