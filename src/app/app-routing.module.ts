import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';

import { AuthGuardService } from './_guards/auth.guard';

 const routes: Routes = [
  
 {
    path: '',
    component: LoginComponent
  },
  {
    
    path: 'acceuil',
    component: TodoComponent,
    canActivate: [AuthGuardService],
  }
]; 



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
