import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './mycomponents/admin-header/admin-header.component';
import { AdminLoginComponent } from './mycomponents/admin-login/admin-login.component';
import { LoginComponent } from './mycomponents/login/login.component';
import { SigninComponent } from './mycomponents/signin/signin.component';
import { SignupComponent } from './mycomponents/signup/signup.component';
import { NavComponent } from './mycomponents/nav/nav.component';
import { AdminHomeComponent } from './mycomponents/admin-home/admin-home.component';
import { HeaderAdminComponent } from './mycomponents/header-admin/header-admin.component';
import { HeaderSubadminComponent } from './mycomponents/header-subadmin/header-subadmin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

import {  ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AdminPatientListComponent } from './mycomponents/admin-patient-list/admin-patient-list.component';
import { FooterComponent } from './mycomponents/footer/footer.component';
import { PatientdashboardComponent } from './mycomponents/patientdashboard/patientdashboard.component';
import { NurseDashboardComponent } from './mycomponents/nurse-dashboard/nurse-dashboard.component';
import { PopupComponent } from './mycomponents/popup/popup.component';
import {FullCalendarModule}  from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin // a plugin
import { DatePipe } from '@angular/common';
import { BookapointmentComponent } from './mycomponents/bookapointment/bookapointment.component';
import { AddslotComponent } from './mycomponents/addslot/addslot.component'

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
const materialModules = [
  MatIconModule
];

@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminLoginComponent,
    LoginComponent,
    SigninComponent,
    SignupComponent,
    NavComponent,
    AdminHomeComponent,
    HeaderAdminComponent,
    HeaderSubadminComponent,
    AdminPatientListComponent,
    FooterComponent,
    PatientdashboardComponent,
    NurseDashboardComponent,
    PopupComponent,
    BookapointmentComponent,
    AddslotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    FullCalendarModule,
    ReactiveFormsModule  
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

