import { Component, Input, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-addslot',
  templateUrl: './addslot.component.html',
  styleUrls: ['./addslot.component.css','../../../assets/css/bootstrap.min.css']
})
export class AddslotComponent implements OnInit {
  starttime:string | undefined;
  endtime:string | undefined;
  slotdata:any;
  UserData: any=[];
  @Input() selecteddate:string | undefined;
  
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.UserData = localStorage.getItem('UserData');
    console.log('this.UserData---------------------------->',this.UserData)
  }

  add_slot(form:NgForm){
    
    console.log('added slot',form.value)
    this.slotdata= {
        'date':this.selecteddate,
        'appointmentTime':form.value.starttime+' - '+form.value.endtime
    }
    console.log('selected time------------------->',this.slotdata)
    if(form.value.starttime!=undefined && form.value.endtime!=undefined){
      this.appService.AddAppointment(this.slotdata).subscribe((res: any) =>{
        console.log('return data---------------->',res)
        alert('slot is added for date :'+this.selecteddate)
        location.reload();
      });
    }else{
      alert('Please select start & end time')
    }
    
  }
}
