import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { CanActivate, Router } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';
import { DatePipe, formatDate } from '@angular/common'

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/style.css']
})
export class NurseDashboardComponent implements OnInit {
  public UserData: any = null;
  public nextapt: any = [];
  
  currentuserid:string | undefined;
  slotbook:any=[];
  calendar:any;
  tabname:string='Calender';
  public events = [];
  public selectedDate='2021-06-08';
  hidetime=false;
  hidediv:boolean=true;
  selecteddate:any;
  selectedtime:string | undefined;
  currentrole:string | undefined
  slots:any=[]
  requestedslot:any=[]
  slotBook:any=[];
  eventsdata: {
    title: string;
    date: any;
  } | undefined

  event:any=[]  ;
  changeBooking: any;
  showUpcoming: boolean | undefined;
  slotbooked: any=[];
  nurseHomedata: any;
  calendarOptions: CalendarOptions = {};
  constructor(private appService: AppService,private route:Router,public datepipe: DatePipe) {  }
  
  

  
  // -------------------------------------  calender data -----------------------------------------------------
  changedivflag(x:any){
    this.hidediv = x
    // console.log('flag value',this.hidediv) 
  }
  updatevalue(arg: any){
    alert(arg)
    // console.log('info----------------->',arg)
  }

  
  changeHidevalue(arg: any){
    
    console.log('info----------------->',arg.dateStr)
			// this.date.setDate(this.date.getDate()+2)
      // var date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
      // console.log(arg.dateStr,date, arg.dateStr > this.date)
      var date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
      var date2 = formatDate(arg.dateStr,'yyyy-MM-dd','en_US');
      this.selecteddate = date2;
      // console.log(this.selecteddate);
      if(date2 > date1){
        this.changedivflag(false)
        // console.log('date is More') 
      }else{
        this.changedivflag(true)
        alert('Click data after :--->' + arg.dateStr)
        
      }
    }
  

  
  selecttime(e:any){
    // console.log('Selected Appointment------------------->',e.target.value)
    this.selectedtime = e.target.value
  }

  BookSlot(){
    var slotedata={
        'date':this.selecteddate,
        'userID':this.currentuserid,
        'update':0,
        'role':this.currentrole
    }
    // console.log('slotedata----------------->',slotedata)
    this.appService.Bookslot(slotedata).subscribe((res: any) =>{
          // console.log('return data---------------->',res)
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
   
  async getAppointment(){
    await this.appService.getAppointmentdata().subscribe((res: any) =>{
      // //console.log('return data---------------->',res)
      this.slotBook = res
      //console.log('slots--------------------------->',this.slotBook)
    });
  }
  
  
  ngOnInit(): void {

    this.getAppointment()
    this.appService.getnursedata().subscribe((res: any) =>{
      // console.log(res)
      this.nurseHomedata = res
      // console.log('nurseHomedata--------------------------->',this.nurseHomedata)
      var first=true;
      res.requestedData.forEach((requestdata: any) => {
        // var appointment = this.slotBook.find((x:any)=> x._id== requestdata.appointmentID)
        var slotuserdata = res.allUsers.find((x:any)=> x._id== requestdata.userID)
        this.requestedslot.push({
          date: requestdata.bookDate,
          Time: requestdata.appointmentTime,
          username: slotuserdata.userName, 
          _id: requestdata._id})
      });
      res.slotBook.forEach((booking:any)=>{
        booking.slots.forEach((slot:any)=>{
            var appointment = this.slotBook.find((x:any)=> x._id== slot.appointmentID)
            var slotuserdata = res.allUsers.find((x:any)=> x._id== slot.userID)
            var time= appointment.appointmentTime.split("-")
            this.slotbooked.push({'date':booking.bookDate,'Time':appointment.appointmentTime,'username':slotuserdata.userName})
            this.event.push({
              start:booking.bookDate+"T"+ this.convertTo24Hour(time[0].toLowerCase()+":00"),
              end: booking.bookDate+"T"+ this.convertTo24Hour(time[0].toLowerCase()+":00"),
              color: 'green',
              description:slot.appointmentID
            })
        });
        
      });
      
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        contentHeight: 600,
        height: 600,
        initialDate: new Date().toISOString().slice(0, 10),
        eventTimeFormat: { 
          hour: 'numeric',
          minute: 'numeric',
          hour12:true
        },
        weekends: true ,
        events: this.event,
        dayMaxEventRows: true,
        dateClick:this.changeHidevalue.bind(this),
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
    // this.UserData.userName == 'undefined';
    this.UserData = localStorage.getItem('UserData');
    this.UserData = JSON.parse(this.UserData);
    this.currentrole = this.UserData.role
    this.currentuserid = this.UserData._id
  }
  Logout(){
    localStorage.removeItem('UserData');
     this.route.navigate(['']);
   }

  Login(){
    localStorage.removeItem('UserData');
     this.route.navigate(['/register']);
  }

  openTab(tabname:string){
    // console.log(tabname)
    this.tabname = tabname;
    // console.log(this.tabname)
    if(tabname){
      this.hidediv=true
    }else{
      
    }    
  }

    
    async approveSlot(id:string){
      this.appService.ApproverequestSlot(id).subscribe((res)=>{
        alert("slot approved")
        location.reload()
      });
    }

    async deleteSlot(id:string){
      if(confirm("Are you sure?")){
        this.appService.deleteAppointment(id).subscribe(res=>{
          alert("slot deleted")
          location.reload()
        })
      }
    }
}

