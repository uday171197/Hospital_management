import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-bookapointment',
  templateUrl: './bookapointment.component.html',
  styleUrls: ['./bookapointment.component.css','../../../assets/css/bootstrap.min.css']
})
export class BookapointmentComponent implements OnInit {
  @Input() selecteddate: string | undefined;
  public UserData: any = [];
  starttime:string | undefined;
  endtime:string | undefined;
  slotdata:any;
  currentuserid:string | undefined;
  selectedtime:string | undefined;
  slots:any=[]
  slotBook:any=[];
  showinput:boolean=true;
  hidebutton:boolean=false;
  hideslot:boolean=false;
  constructor(private appService: AppService) { }

  ngOnChanges(changes:any) {
    this.getAppointment()
  }

  ngOnInit(): void {
    this.UserData = localStorage.getItem('UserData');
    this.UserData = JSON.parse(this.UserData);
      if(this.UserData != []){
      this.currentuserid = this.UserData._id
      }
  }

  selecttime(e:any){
    this.selectedtime = e.target.value
  }

  BookSlot(){
    if(this.selectedtime){
      var slotedata={
        'date':this.selecteddate,
        'userID':this.currentuserid,
        'appointment':this.selectedtime
      }
      this.appService.Bookslot(slotedata).subscribe((res: any) =>{
          // console.log('return data---------------->',res)
          if(res=='1'){
            alert('slot is booked')
            location.reload()
          }
          else{
            alert('slot is already booked')
          }
      });
    }
    else{
        alert('Please select slot')
    }
  }

  async getAppointment(){
    this.slotBook=[]
    await this.appService.getAppointmentdata().subscribe((res: any) =>{
      // console.log('return data---------------->',res)
      res.forEach((slot:any) => {
        // console.log(slot)
        if(slot.date){
          if(slot.date==this.selecteddate)
            this.slotBook.push(slot)
        }
        else
          this.slotBook.push(slot)
      });
      // this.slotBook = res
      
      // console.log('slots--------------------------->',this.slotBook)
    });
  }

  change_status(){
   this.showinput = false;
   this.hideslot = true;
   this.hidebutton=true;
  }

  requested_slot(form:NgForm){
    // console.log('added slot',form.value)
    // var userdata = JSON.parse(this.UserData)
    this.slotdata= {
        'bookDate':this.selecteddate,
        'appointmentTime':form.value.starttime+' - '+form.value.endtime,
        'userID':this.UserData._id
    }
    // console.log('selected time------------------->',this.slotdata)
    this.appService.AddrequestSlot(this.slotdata).subscribe((res: any) =>{
      alert("Slot requested");
      location.reload();
      // console.log('return data---------------->',res)
    });
  }
}
