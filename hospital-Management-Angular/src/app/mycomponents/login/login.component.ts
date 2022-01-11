import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AppService } from '../../app.service';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/hospitalmain.css']
})
export class LoginComponent implements OnInit {
  email:string | undefined;
  password:string | undefined;
  passwordlength = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isValidFormSubmitted = false;
  WrongCred:boolean=false; 
  private UserData: any = [];
  constructor(private appService: AppService,private route:Router,) {}
  

  ngOnInit(): void {
  }
  onLoginSubmit(form: NgForm){
    
    this.isValidFormSubmitted = false;  
    
    
    if (form.invalid && form.value.password.length <8) { 
      if(form.value.password.length <8){
        this.passwordlength = true;
      } 
       return;  
    } 
    this.isValidFormSubmitted = true; 
    if(this.isValidFormSubmitted){
      console.log(form.value);
      // console.log(form.value.password.length);
      // this.appService.getUsers().subscribe(data =>{
      //     console.log(data);
      // });
      this.appService.Signin(form.value).subscribe(data =>{
        console.log('data------------------>',data);
        this.UserData = data;
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
          this.WrongCred=true; 
        }
        // 
    });

    }
  }
}

