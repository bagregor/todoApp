import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { AuthGuardService } from './_guards/auth.guard';
import { MedecinComponent } from './components/medecin/medecin.component';
import { PatientComponent } from './components/patient/patient.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { SecretaireComponent } from './components/secretaire/secretaire.component';
import { PagePrincipalComponent } from './components/page-principal/page-principal.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { RendezVousComponent } from './components/rendez-vous/rendez-vous.component';

/* const routes: Routes = [
  { path: 'medecin', component : MedecinComponent , canActivate: [AuthGuardService] },
  { path: 'patient', component : PatientComponent , canActivate: [AuthGuardService]},
  { path: 'register-user', component : RegisterUserComponent , canActivate: [AuthGuardService]},
  { path: 'profile', component : ProfileComponent , canActivate: [AuthGuardService]},
  { path: 'secretaire', component : SecretaireComponent , canActivate: [AuthGuardService]},
  { path: 'login', component : LoginComponent },
  { path: 'layout', component : LayoutComponent, canActivate: [AuthGuardService]},
  { path: 'acceuil', component : PagePrincipalComponent},
  { path: '', component : LoginComponent},
  //{ path: '**', redirectTo: '' }

]; */
 const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent
  },
  {
    
    path: 'acceuil',
    component: PagePrincipalComponent,
    //canActivate: [AuthGuardService],
    children: [
      {
        path: 'medecin',
        component: MedecinComponent,
      //  canActivate: [AuthGuardService],
      },
      {
        path: 'patient',
        component: PatientComponent,
       // canActivate: [AuthGuardService],
      },
      {
        path: 'secretaire',
        component: SecretaireComponent,
       // canActivate: [AuthGuardService]
      },
      {
        path: 'utilisateurs',
        component: RegisterUserComponent,
       // canActivate: [AuthGuardService]
      },
      {
        path: 'consultation',
        component: ConsultationComponent,
       // canActivate: [AuthGuardService]
      },
      {
        path: 'rendezVous',
        component: RendezVousComponent,
        //canActivate: [AuthGuardService]
      },
      {
        path: 'patient',
        component: PatientComponent,
       // canActivate: [AuthGuardService]
      }
    ]
  }
]; 



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
