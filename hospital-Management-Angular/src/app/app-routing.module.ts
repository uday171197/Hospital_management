import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './mycomponents/admin-home/admin-home.component';
import { AdminLoginComponent } from './mycomponents/admin-login/admin-login.component';
import { LoginComponent } from './mycomponents/login/login.component';
import { NurseDashboardComponent } from './mycomponents/nurse-dashboard/nurse-dashboard.component';
import { PatientdashboardComponent } from './mycomponents/patientdashboard/patientdashboard.component';
import { SigninComponent } from './mycomponents/signin/signin.component';
import { SignupComponent } from './mycomponents/signup/signup.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  {path: 'admin-login', component:AdminLoginComponent},
  {path: 'admin-home', component:AdminHomeComponent},  
  {path: 'patient-dash', component:PatientdashboardComponent},  
  {path: 'nurse-dash', component:NurseDashboardComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
