import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { CanActivate, Router } from '@angular/router';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/hospitalmain.css','../../../assets/css/style.css'],
  template: 'passed in {{ data.id,data.collection }}',
})
export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string,collection:string},private appService: AppService,private route:Router) { }
  ngOnInit(): void {
  }
  deletedata(id: any,collection: any){
    // console.log('calling delete function')
    


    if(collection=='Nurse'){
      console.log(id,collection)
      this.appService.deleteuser(id).subscribe(res =>{
        console.log('return value--------------------->'+ JSON.stringify(res));
        if(res=='1'){
          console.log('Appointment is deleted')
          location.reload();
        }else{
          console.log('Error while deleting Appointment')
        }
      });
    }
    
    if(collection=='Patient'){
      console.log(id,collection)
      this.appService.deleteuser(id).subscribe(res =>{
        console.log('return value--------------------->'+ JSON.stringify(res));
        if(res=='1'){
          console.log('Appointment is deleted')
          location.reload();
        }else{
          console.log('Error while deleting Appointment')
        }
      });
    }
  }
}
