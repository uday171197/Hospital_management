import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppService } from '../../app.service';
import { CanActivate, Router } from '@angular/router';
import { NgForm, FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule } from '@angular/forms';
import{AdminUser} from '../../User.module'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/hospitalmain.css',]
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});
  loading = false;
  submitted = false;
  adminUser: AdminUser[] | undefined;
  email:string | undefined;
  password:string | undefined;
  passwordlength = false;
  loginfail=false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isValidFormSubmitted = false; 
  private UserData: any = []
  
  // user = new User(); 
 
  constructor(private appService: AppService,private route:Router,private formBuilder: FormBuilder) {}
  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log('user data ',this.loginForm.value)
    this.appService.adminSignin(this.loginForm.value).subscribe(res=>{
      console.log(this.loginForm.value);
      this.UserData = res;
      console.log(res)
      if(this.UserData.data.flag == 1){
        localStorage.setItem("UserData", JSON.stringify(this.UserData.data.data));
        this.loading = true;
        this.route.navigate(['/admin-home']);
      }else{
        this.loginfail = true;
        
      }
  });
  }
  }

