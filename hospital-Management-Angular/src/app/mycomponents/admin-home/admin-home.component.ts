import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { CanActivate, Router } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/hospitalmain.css']
})
export class AdminHomeComponent implements OnInit {
  // UserData = localStorage.getItem('UserData');
  bodyText: string | undefined;
  IsmodelShow:boolean=false;
  currentuserID:string | undefined;
  tabname:string = 'Patients';
  name:string | undefined;
  password:string | undefined;
  email:string | undefined;
  Address:string | undefined;
  contactDetails:Number | undefined;
  valueExist: boolean = false;

  public PatientsData: any = []
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public nursedata: any = []
  public nurses: any = [];
  public UserData: any = []
  deleteid:string | undefined;
  
  constructor(private appService: AppService,private route:Router,private dailogref:MatDialog) {  }
  
  GetPatientsData(){
    console.log('fetching Patient Data')
    this.appService.getpatienddata().subscribe(res =>{
          this.PatientsData = JSON.stringify(res);
          this.PatientsData = JSON.parse(this.PatientsData).PatientDetails
          
          // this.PatientsData.allUsers.forEach((user: any) => {
          //   var users = user.find()
          // });
          
      });
  };
  
  getnursedata(){
    console.log('fetching Nurse Data')
    this.appService.getnursedata().subscribe(res =>{
          this.nursedata = JSON.stringify(res);
          this.nursedata = JSON.parse(this.nursedata);
          // console.log('nurse data---------------->',this.nursedata)
          this.nursedata.allUsers.forEach((user: any) => {
            // console.log('All nursedata --->',user);
            if(user.role=='nurse'){
              this.nurses.push(user)
              
            }
            // var users = user.find()
          });
          console.log('All nursedata --->',this.nurses);
          

      });
  };
  
  openTab(tabname:string){
    // console.log(tabname)
    this.tabname = tabname;
    if(this.tabname=='Patients'){
      this.GetPatientsData();
    }
    
    if(this.tabname=='Nurse'){
      this.getnursedata();
    }
   }
   
  ngOnInit(): void {
    if(this.tabname=='Patients'){
      this.GetPatientsData();
    }
    if(this.tabname=='Patients'){
      this.GetPatientsData();
    }
      this.valueExist=false;
      this.UserData = localStorage.getItem('UserData');
      this.UserData = JSON.parse(this.UserData);
      // this.role = this.UserData.role;
      // this.currentuserID = JSON.parse(this.UserData)._id;
      console.log('currwnt user data ------------------------>', JSON.stringify(this.UserData));
  }

  


  
   Logout(){
    localStorage.removeItem('UserData');
     this.route.navigate(['/admin-login']);
   }
   deleteUser(){
    console.log('deleting user')
   }
  
   submitNurseData(form:NgForm){
    console.log(form.value);
    this.appService.AddNewUser(form.value).subscribe(res =>{
      console.log('return value--------------------->'+ JSON.stringify(res));
      if(res=='1'){
        location.reload();
      }else{
        this.valueExist=true;
      }
    });
   }

   
   




   submitpatientData(form:NgForm){
    console.log(form.value);
    this.appService.AddNewUser(form.value).subscribe(res =>{
      console.log('return value--------------------->'+ JSON.stringify(res));
      if(res=='1'){
        location.reload()
      }else{
        this.valueExist=true;
      }
    });
   }

   
   deletedata(_deleteid: any,_collection: any){
       this.dailogref.open(PopupComponent,{
        height: '255px',
        width: '550px',
        data:{id:_deleteid,collection:_collection}
       },); 
      //  console.log(_deleteid,_collection)
   }
}

