import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagePrincipalComponent } from './components/page-principal/page-principal.component';
import { MedecinComponent } from './components/medecin/medecin.component';
import { PatientComponent } from './components/patient/patient.component';
import { SecretaireComponent } from './components/secretaire/secretaire.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { RendezVousComponent } from './components/rendez-vous/rendez-vous.component';
import { HospitalisationComponent } from './components/hospitalisation/hospitalisation.component';
import { LitComponent } from './components/lit/lit.component';
import { ChambreComponent } from './components/chambre/chambre.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory  } from '@stomp/ng2-stompjs';
/*import { CalendarModule , DateAdapter} from 'angular-calendar';
import { SchedulerModule } from 'angular-calendar-scheduler';
import * as moment from 'moment';*/


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
    HeaderComponent,
    ConsultationComponent,
    RendezVousComponent,
    HospitalisationComponent,
    LitComponent,
    ChambreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //CalendarModule.forRoot({ provide: DateAdapter, useFactory: moment}),
    //SchedulerModule.forRoot({ locale: 'fr', headerDateFormat: 'daysRange' }),
  ],
  providers: [
   // RxStompService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

