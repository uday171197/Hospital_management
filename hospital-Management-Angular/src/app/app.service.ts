import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:3000/';



  adminSignin(user: any) {
    return this.http.post(this.rootURL + 'admin_signin', {user},{headers:{},responseType: "json" });
  }
  Signin(user: any) {
    return this.http.post(this.rootURL + 'signin', {user},{headers:{},responseType: "json" });
  }
  getpatienddata() {
    return this.http.get(this.rootURL+'adminhome',{headers:{},responseType: "json" });
  }

  getrequestedSlot() {
    return this.http.get(this.rootURL+'getrequestedslot',{headers:{},responseType: "json" });
  }


  getnursedata() {
    return this.http.get(this.rootURL+'nursehome',{headers:{},responseType: "json" });
  }
  getAppointmentdata() {
    return this.http.get(this.rootURL+'appointment',{headers:{},responseType: "json" });
  }

  getpatienthomedata() {
    return this.http.get(this.rootURL+'patienthome',{headers:{},responseType: "json" });
  }

  getnursehomedata() {
    return this.http.get(this.rootURL+'nursehome',{headers:{},responseType: "json" });
  }
  
    //  ---------------------push request-------------------------------------------


  AddNewUser(user: any){
    return this.http.post(this.rootURL + 'addnewuser', {user},{headers:{},responseType: "json" });
  }
  AddrequestSlot(user: any){
    return this.http.post(this.rootURL + 'addrequestedslot', {user},{headers:{},responseType: "json" });
  }

  ApproverequestSlot(id: string){
    return this.http.post(this.rootURL + 'approverequestedslot', {id:id},{headers:{},responseType: "json" });
  }

  DeleterequestSlot(slot: string){
    return this.http.delete(this.rootURL + 'requestedslot/'+slot);
  }
  
  AddAppointment(user: any){
    return this.http.post(this.rootURL + 'appointment', {user},{headers:{},responseType: "json" });
  }

  Bookslot(user: any){
    return this.http.post(this.rootURL + 'bookslot', {user},{headers:{},responseType: "json" });
  }



  UserSignup(user: any){
    return this.http.post(this.rootURL + 'signup', {user},{headers:{},responseType: "json" });
  }
  // delete function------------------------------------------------------------------------>
  deleteAppointment(id: string){
    return this.http.delete(this.rootURL +'appointment/'+id)
  }

  deleteuser(user: any){
    return this.http.delete(this.rootURL +'deleteuser/'+user);
  }

}