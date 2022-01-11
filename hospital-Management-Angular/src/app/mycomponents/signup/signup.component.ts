
import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppService } from '../../app.service';
import { CanActivate, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import{AdminUser} from '../../User.module'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/hospitalmain.css']
})
export class SignupComponent implements OnInit {
  name:string | undefined;
  email:string  | undefined;
  password:string =''
  patient:string | undefined;
  nurse:string | undefined;
  code:string | undefined;
  allowNews:string | undefined;
  disabled='disabled';
  passwordlength = false;
  loginfail=false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isValidFormSubmitted = false; 
  alreadyexist:boolean=false;
  isvarified:boolean=true;
  issendedotp:boolean=false;
  desableButton:boolean=false;
  WrongCred:boolean=false;
  sessionCode:Number | undefined;
  private UserData: any = [];
  private Code: any = [];
  


  constructor(private appService: AppService,private route:Router,) {}
  

  ngOnInit(): void {
  }
  
  
    
  onRegister(form:NgForm){
    console.log(form.value)
    if(this.password.length<8){
      this.passwordlength = true;
    }else{
      this.appService.UserSignup({'formdata':form.value,'sessionCode':localStorage.getItem("sessionCode")}).subscribe(data=>{
        console.log('return daat ------------------->'+data);
        this.UserData = data;
        console.log(JSON.stringify(this.UserData));
        this.isvarified=true;
        if(this.UserData.status=='1'){
             localStorage.setItem("UserData", JSON.stringify(this.UserData.data));
          this.route.navigate(['/patient-dash']);
        }
        if(this.UserData.status=='2'){
             localStorage.setItem("UserData", JSON.stringify(this.UserData.data));
          this.route.navigate(['/nurse-dash']);
        }
        if(this.UserData.status=='3'){
            localStorage.setItem("UserData", JSON.stringify(this.UserData.data));
          this.route.navigate(['/admin-home']);
        }
        if(this.UserData.status=='0'){
          console.log('Something went wrong')
          this.WrongCred=true; 
        }
      });
    }
      
  }
}
