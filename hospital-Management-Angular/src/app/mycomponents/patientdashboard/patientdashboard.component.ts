import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { CanActivate, Router } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';
import { ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { DatePipe, formatDate } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/style.css']
})
export class PatientdashboardComponent implements OnInit {
  public UserData: any = null;
  public nextapt: any = [];
  appointsments:any=[];
  public Appointmentdata: any = [];
  public patientdata:any=[]
  slotbook:any=[];
  slotbooked:any=[];
  currentuserid:string | undefined;
  RequestedSlotData:any=[];
  slotBook:any=[];
  PatientsData:any=[];
  allUsers:any=[];
  calendar:any;
  tabname:boolean = false;
  public events = [];
  hidetime=false;
  hidediv:boolean=true;
  selecteddate:any;
  selectedtime:string | undefined;
  currentrole:string | undefined
  calendarOptions: CalendarOptions = {};
  event:any=[];
  showUpcoming:boolean=false;
  upcomingSlot:string="";
  foundRequestedSlot:boolean=false;
  RequestedSlotMsg:string="";
  patientHomedata: any;

  constructor(private appService: AppService,private route:Router,public datepipe: DatePipe,private dailogref:MatDialog) {  }
  
  

  
  // -------------------------------------  calender data -----------------------------------------------------


  changedivflag(x:any){
    this.hidediv = x
    //console.log('flag value',this.hidediv) 
  }
  updatevalue(arg: any){
    alert(arg)
    //console.log('info----------------->',arg)
  }
  changeHidevalue(arg: any){
      var date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
      var date2 = formatDate(arg.dateStr,'yyyy-MM-dd','en_US');
      this.selecteddate = date2;
      //console.log(this.selecteddate);
      if(date2 > date1){
        this.changedivflag(false)
        //console.log('date is More') 
      }else{
        this.changedivflag(true)
        alert('Click data after :--->' + arg.dateStr)
        
      }
    }
  

  selecttime(e:any){
    this.selectedtime = e.target.value
  }

  async GetRequestedSlot(){
    // //console.log('fetching Slot Data')
    this.appService.getAppointmentdata().subscribe((slotBook: any) =>{
     this.appService.getrequestedSlot().subscribe(res =>{
      this.RequestedSlotData = res;
      // console.log(this.RequestedSlotData)
      this.RequestedSlotData.data.every((slot:any) => {
        if(slot.userID==this.currentuserid){
          var appt=slotBook.find((x:any)=>x.appointmentTime==slot.appointmentTime)
          // console.log(appt)
          if(appt){
            if(appt.date){
              if(appt.date==slot.bookDate){
                this.foundRequestedSlot=true;
                this.RequestedSlotMsg="Hurray! Your requested slot on <b>"+slot.bookDate+" @"+slot.appointmentTime+"</b> has been addded";
                this.appService.DeleterequestSlot(slot._id).subscribe();
                return false;
              }
            }
            else{
              this.foundRequestedSlot=true;
              this.RequestedSlotMsg="Hurray! Your requested slot on <b>"+slot.bookDate+" @"+slot.appointmentTime+"</b> has been addded";
              this.appService.DeleterequestSlot(slot._id).subscribe();
              return false;
            }
          }
        }
        return true;
      });
      // console.log('requested data---------------- --->',this.RequestedSlotData);
      });
    });
  };

  async getAppointment(){
    await this.appService.getAppointmentdata().subscribe((res: any) =>{
      // //console.log('return data---------------->',res)
      this.slotBook = res
      //console.log('slots--------------------------->',this.slotBook)
    });
  }

  BookSlot(){ 
      var slotedata={
        'date':this.selecteddate,
        'userID':this.currentuserid,
        'appointmentId':this.selectedtime}
        alert("booking")
    //console.log('slotedata----------------->',slotedata)
    this.appService.Bookslot(slotedata).subscribe((res: any) =>{
          //console.log('return data---------------->',res)
          location.reload()
    });
  }
  
  convertTo24Hour(time:string) {
    var hours = parseInt(time.split(":")[0]);
    if(time.indexOf('am') != -1 && hours == 12) {
    time = time.replace('12', '0');
  }
  else if(time.indexOf('am') != -1 && hours < 11){
    time="0"+time
  }
    if(time.indexOf('pm')  != -1 && hours < 12) {
        time = time.replace(hours.toString(), (hours + 12).toString());
  }
    return time.replace(/(am|pm)/, '').replace(/\s/g, '');
  }
  
  ngOnInit(): void {
    this.getAppointment()

    setInterval(()=>{
      this.GetRequestedSlot()
    },5000)

    this.appService.getpatienthomedata().subscribe((res: any) =>{
      this.patientHomedata = res
      var first=true;
      res.slotBook.forEach((booking:any)=>{
        booking.slots.forEach((slot:any)=>{
          if(slot.userID==this.currentuserid){
            var appointment = this.slotBook.find((x:any)=> x._id== slot.appointmentID)
            var time= appointment.appointmentTime.split("-")
            if(first){
              first = false;
              this.showUpcoming=true;
              this.upcomingSlot="You have an upcoming appointment on <b>"+booking.bookDate+" @"+appointment.appointmentTime+"</b>"
            }
            this.slotbooked.push({'date':booking.bookDate,'Time':appointment.appointmentTime})
            this.event.push({
              // title:appointment.appointmentTime,
              start:booking.bookDate+"T"+ this.convertTo24Hour(time[0].toLowerCase()+":00"),
              end: booking.bookDate+"T"+ this.convertTo24Hour(time[0].toLowerCase()+":00"),
              color: 'green',
              description:slot.appointmentID
            })

          }
        });
      });

      // this.getClinicdata()
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        contentHeight: 600,
        height: 600,
        initialDate: new Date().toISOString().slice(0, 10),
        duration: { weeks: 8 },
        selectable: true,
        editable: true,
        droppable: true, // will let it receive events!
        eventAllow: function(dropInfo, draggedEvent) {
          if(dropInfo.start<=new Date())  return false;
          else  return true;
        },
        eventDrop: this.changeBooking.bind(this),
        // displayEventEnd:false,
        eventTimeFormat: { 
          hour: 'numeric',
          minute: 'numeric',
          hour12:true
        },
        dateClick:this.changeHidevalue.bind(this),
        weekends: true ,
        events: this.event,
        dayMaxEventRows: true,
        views: {
          timeGrid: {
            dayMaxEventRows: 2 // adjust to 6 only for timeGridWeek/timeGridDay
          },
          dayGridMonthCustom: {
            type: "dayGridMonth",
            fixedWeekCount: false,
          },
        }
      };
    });
    // console.log('slotbooked--------------------------->',this.slotbooked)
    this.UserData = localStorage.getItem('UserData');
    this.UserData = JSON.parse(this.UserData);
      if(this.UserData != []){
        this.currentrole = this.UserData.role
      this.currentuserid = this.UserData._id
      }
      
      //console.log('user data------------------------>',this.UserData);
      
  }
  Logout(){
    localStorage.removeItem('UserData');
     this.route.navigate(['']);
   }

  changeBooking(info:any){
     if (!confirm("Are you sure?")) {
        info.revert();
      }
    else{
      var oldDateStr = info.oldEvent.startStr.split("T")[0];
      var newDateStr = info.event.startStr.split("T")[0];
      var appointmentID = info.event.extendedProps.description;

      var slotdata={
        'date':oldDateStr,
        'newDate':newDateStr,
        'userID':this.currentuserid,
        'appointment':appointmentID,
        'update':1,
      }
      //console.log('slotedata----------------->',slotedata)
      this.appService.Bookslot(slotdata).subscribe((res: any) =>{
            //console.log('return data---------------->',res)
            if(res==1){
              alert("Slot updated.");
              location.reload()
            }
            else if(res=='-2'){
              alert('This slot is not available on '+slotdata.newDate);
              info.revert();
            }
            else{
              alert("This slot is already booked.");
              info.revert();
            }
      });
    }
  }

  Login(){
    localStorage.removeItem('UserData');
     this.route.navigate(['']);
  }

  openTab(tabname:string){
    //console.log(tabname)
    
    if(tabname == 'Calender' && this.UserData != null){
      this.tabname = tabname== 'Calender'?false:true ;
      //console.log(this.tabname)
      this.hidediv=true
    }else{
      this.tabname = tabname== 'Calender'?false:true ;
      //console.log(this.tabname)
    }    
  }
}