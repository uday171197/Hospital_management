// var deleteClinicID = "", deleteUserID = "";

// //Function takes data for Admin Login and Authorizes the user
// $("#adminloginForm").on('submit', function(e){
//   e.preventDefault(); 
//   if ((document.hospitaladminform.login_pass.value).length < 8) {
//       //alert("Length of the password must be minimum 8");
//       document.getElementById("incorrectpass").style.display = "block";
//       return false;
//   }
//   else if ((document.hospitaladminform.login_pass.value).length >= 8) {
//     document.getElementById("incorrectpass").style.display = "none";
//   }
//   // console.log($("#adminloginForm").serialize())
//   $.ajax({
//     url:'/admin_signin',
//     type:'post',
//     data:$("#adminloginForm").serialize(),
//     success:function(res){
//       if(res==1){
//         window.location.href="/clinicDashboard"
//       }
//       else{
//         $("#login").show();
//       }
//     },
//     error:function(){
//       $("#login").show();
//     }
//   });
// });

// //Function takes data for adding new user Validates it and send it to Backend
// $("#addnewuserForm").on('submit', function(e){
//   e.preventDefault(); 
//   if ((document.addnewuserform.name.value).length < 3) {
//     document.getElementById("fullname").style.display = "block";
//     return false;
//   }
//   else if ((document.addnewuserform.name.value).length > 3) {
//     document.getElementById("fullname").style.display = "none";
    
//   }
//   if ((document.addnewuserform.password.value).length < 8) {
//     document.getElementById("password").style.display = "block";
//     return false;
//   }
//   else if ((document.addnewuserform.password.value).length >= 8) {
//     document.getElementById("password").style.display = "none";
//   }
//   if($("#clinicID").val() == null){
//     alert("Please enter Clinic");
//   }
//   else{
//   console.log($("#addnewuserForm").serialize())
//   $.ajax({
//     url:'/addnewuser',
//     type:'post',
//     data:$("#addnewuserForm").serialize(),
//     success:function(res){
//       alert("User Added");
//       location.reload();
//     },
//     error:function(){
//       alert("Some Error Occurred");
//     }
//   });
// }
// });

// //Function to display Pop-up to confirm Delete User
// function confirmDeleteUser(id){
//   deleteUserID = id;
//   $("#deleteUserModal").modal("show");
// }

// //Function to call Backend to delete User
// function deleteUser(){
//   console.log(deleteUserID)
//   $.ajax({
//     url:'/deleteuser',
//     type:'delete',
//     data:{'_id': deleteUserID},
//     success:function(res){
//         alert("User Deleted")
//         location.reload();
//     },
//     error:function(){
//       alert("Some Error Occurred");
//     }
//   });
// }

// //Function to validate data and send it to backend for adding Clinic
// $("#addClinicForm").on('submit', function(e){
//   e.preventDefault(); 
//   if($('input[name="clinicName"]').val() != "" && $('input[name="Email"]').val() != "" && $('input[name="Address"]').val() != "" && $('input[name="contactDetails"]').val() != "" ){
//     $.ajax({
//       url:'/clinic',
//       type:'POST',
//       data: $("#addClinicForm").serialize(),
//       success:function(res){
//         location.reload();
//       },
//       error:function(){
//         alert("Some Error Occurred");
//       }
//     });
//   }
//   else{
//     ($('input[name="clinicName"]').val() == "") ? $('input[name="clinicName"]').css("border-color","red") : $('input[name="clinicName"]').css("border-color","#ccc");
//     ($('input[name="Email"]').val() == "") ? $('input[name="Email"]').css("border-color","red") : $('input[name="Email"]').css("border-color","#ccc");
//     ($('input[name="Address"]').val() == "") ? $('input[name="Address"]').css("border-color","red") : $('input[name="Address"]').css("border-color","#ccc");
//     ($('input[name="contactDetails"]').val() == "") ? $('input[name="contactDetails"]').css("border-color","red") : $('input[name="contactDetails"]').css("border-color","#ccc");
//   }
// });

// //Function to display delete Clinic confirmation Pop-up
// function deleteClinic(id){
//   deleteClinicID = id;
//   $("#deleteClinicModal").modal("show");
// }

// //Function to send data to backend to delete Clinic
// function confirmDeleteClinic(){
//   $.ajax({
//     url:'/clinic',
//     type:'DELETE',
//     data: {id: deleteClinicID},
//     success:function(res){
//       location.reload();
//     },
//     error:function(error){
//       alert("Something Went Wrong");
//     }
//   });
// }
// $(document).ready(function(){
//   $("#mailnews").click(function(){
//     $.ajax({
//       url:'/mailNews',
//       type:'get',
//       success:function(data){
//         alert("News letters are mailed to every subscribed patient")
//       }
//     })
//   })
// })


// function convertTo24Hour(time) {
//   var hours = parseInt(time.split(":")[0]);
//   if(time.indexOf('am') != -1 && hours == 12) {
//       time = time.replace('12', '0');
//   }
// else if(time.indexOf('am') != -1 && hours < 11){
//   time="0"+time
// }
//   if(time.indexOf('pm')  != -1 && hours < 12) {
//       time = time.replace(hours, (hours + 12));
// }
//   return time.replace(/(am|pm)/, '').replace(/\s/g, '');
// }
// //declare global variables for updation and booking of slots
// let upbookslot,bookdate,upbookdate;
// var slotsBook='',updateFlag=false;
// var userID=$("#uid").val();
// var allUsers=JSON.parse($("#allUsers").val())
// $(document).ready(function(){
// /*here we fetch all the bookings by all users to mark them as update on calendar*/
// slotsBook = JSON.parse($("#booked").val())
// $("#booked").remove()
// var events=[]
// slotsBook.forEach((ele)=>{
//   if(ele.slots.length>0){
//   ele.slots.forEach((x)=>{
//     time=$("#appt option[value="+x.appointmentID+"]").data("time").split("-")
//     // if(x.userID==userID){
//       events.push({
//         title:$("#appt option[value="+x.appointmentID+"]").text(),
//         start:ele.bookDate+"T"+ convertTo24Hour(time[0].toLowerCase()+":00"),
//         end: ele.bookDate+"T"+ convertTo24Hour(time[1].toLowerCase()+":00"),
//         color: 'darkorange',
//         appointment:x.appointmentID,
//         doctor:x.doctorID
//       })
//     // }
//   })
// }
// })

// // calender rendering starts below with events
// var calendar = new FullCalendar.Calendar(
// document.getElementById("calendar"),
// {
//   contentHeight: 600,
//   height: 600,
//   theme: true,
//   defaultView: 'dayGridMonth',
//   initialView: "dayGridMonthCustom",
//   initialDate: new Date().toISOString().slice(0, 10),
//   duration: { weeks: 8 },
//   selectable: true,
//   events:events,
//   displayEventEnd:false,
//   eventTimeFormat: { 
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12:true
//   },
//   eventLimit: true,
//   eventClick: function(info) {
//     //when update button calendar is clicked this function triggers and shows slot to update
//     var dt=new Date()
//     dt.setHours(1)
//     info.event._instance.range.start.setHours(23)
//     if(info.event._instance.range.start >= dt){
//       if(bookdate != dt.toISOString().slice(0, 10)){
//         bookdate=new Date(info.event._instance.range.start).toISOString().slice(0, 10)
//         var myslot=''
//         slotsBook.forEach((ele)=>{
//           if(ele.bookDate==bookdate){
//             myslot=ele.slots.find(x=> x.appointmentID==info.event.extendedProps.appointment && x.doctorID==info.event.extendedProps.doctor)
//           }
//         })
//         if(myslot){
//           userID=myslot.userID
//           $("#clinic").attr("disabled",true)
//           clinic=$('#clinic').find("option[value="+myslot.clinicID+"]")
//           $("#clinic option[value="+myslot.clinicID+"]").prop('selected',true)
//           $('#appt option[value='+myslot.appointmentID+']').prop('selected',true);
//           doctor=$(clinic.selector).data("docs").find(x=>x._id==myslot.doctorID)
//           $("#doctor").empty().append(new Option(doctor.doctorName,doctor._id)).attr("disabled",true)

//           $("#bkslot").hide().siblings().show()
//           $(".bookingSlot").show()
//           $("#newslot").show()
//           $("#apptrow").fadeIn()
//           window.scrollTo(0,document.body.scrollHeight);
//           createNewSlot(true)
//         }
//       }
//     }
//     else{
//       $("#apptrow").fadeOut()
//       $("#doctor").empty().append(new Option("Select Doctor","")).attr("disabled",true)
//     }
//   },
//   dateClick: function(date) {
//     //when user clicks on date we'll show options to book appointment
//     var dt=new Date()
//     dt.setDate(dt.getDate()+2)
//     if(date.date > dt){
//       if(bookdate != date.dateStr || updateFlag){
//         bookdate=date.dateStr
//         $('#clinic').prop('selectedIndex', 0).attr("disabled",false);
//         $('#appt').prop('selectedIndex', 0).attr("disabled",true);
//         $("#doctor").empty().append(new Option("Select Doctor","")).attr("disabled",true)
//         $("#bkslot").show().siblings().hide()
//         $("#newslot").hide()
//         $("#apptrow").fadeIn()
//         window.scrollTo(0,document.body.scrollHeight);
//       }
//       bookdate=date.dateStr
//     }
//     else{
//       $("#apptrow").fadeOut()
//       $("#doctor").empty().append(new Option("Select Doctor","")).attr("disabled",true)
//       $("#newslot").hide()
//       $('#appt').prop('selectedIndex', 0).attr("disabled",true);
//       alert("cannot select this date.")
//     }
//   },
//   dayMaxEventRows: true,
//     views: {
//     timeGrid: {
//       dayMaxEventRows: 2 // adjust to 6 only for timeGridWeek/timeGridDay
//     },
//     dayGridMonthCustom: {
//       type: "dayGridMonth",
//       fixedWeekCount: false,
//     },
//     }
// });
// calendar.render();

// /* when we  select clinic function below triggers later we take list of doctors from data and show them in doctors avaialable list*/
// $("#clinic").change(function(){
//   var doctors=($(this).find(":selected").data("docs"))
//   $("#doctor").empty().attr("disabled",true).append(new Option("Select Doctor",""))
//   $('#appt').prop('selectedIndex', 0).attr("disabled",true);
//   $(".bookingSlot").hide()
//   if(doctors.length){
//     $("#doctor").empty().removeAttr("disabled").append(new Option("Select Doctor",""))
//     doctors.forEach(doctor=>{
//       $("#doctor").append(new Option(doctor.doctorName,doctor._id))
//     })
//   }
  
// })

// /* when we  select doctor function below triggers later we enable user to select appointment */
// $("#doctor").change(function(){
//   $('#appt').prop('selectedIndex', 0).attr("disabled",true);
//   $(".bookingSlot").hide()
//   if($(this).val().length){
//     $("#appt").removeAttr("disabled")
//   }
//   else{
//     $("#appt").attr("disabled",true)
//   }
// })

// //when user selects appointment function below shows the slot for it
// $("#appt").change(function(){
//   if($(this).val().length){
//     $(".bookingSlot").show()
//     createNewSlot()
//     $("#newslot").show().siblings().hide()
//   }
//   else{
//     $("#newslot").hide()
//   }
// })

// $("#filterD").change(function(){
//   i=0
//   $(".appointStyle").children().each((i,ele)=>{
//     if(i>0){
//       $(ele).toggle(
//         $(ele).children().first().text().indexOf($(this).val())>-1 &&
//         $(ele).text().toLocaleLowerCase().indexOf($("#filterP").val().toLowerCase())>-1
//       )
//     }
//     i++
//   })
// })

// $("#filterP").keyup(function(){
//   i=0
//   $(".appointStyle").children().each((i,ele)=>{
//     if(i>0){
//       $(ele).toggle(
//         $(ele).text().toLocaleLowerCase().indexOf($(this).val().toLowerCase())>-1 &&
//         $(ele).children().first().text().indexOf($("#filterD").val())>-1
//       )
//     }
//     i++
//   })
// })
// });

// function clearFilter(){
// $(".appointStyle").children().show()
// $("#filterD").val("")
// $("#filterP").val("")
// }

// // function below shows the slot for appointment
// function createNewSlot(update=false){
// let appointment=$("#appt").val()
// let doctor=$("#doctor").val()
// let appointmentTime=$("#appt").find(":selected").data("time")
// let isAvailable=true
// $("#newslot").html("<center> Select <span style='background: "+(update ? 'darkorange' : 'limegreen')+";padding: 2px 10px;'> </span> &nbsp;slot to book</center>"+
// '<center>'+bookdate+'</center><br>')
// slotsBook.forEach(x=> {
//   if(x.bookDate==bookdate){
//     //we check if appointment is already taken
//     if(x.slots.find(y=>y.appointmentID==appointment) && x.slots.find(y=>y.doctorID==doctor)){
//       isAvailable=false
//       name=allUsers.find(y=>y._id==userID).userName
//       if(update){
//         $("#newslot").append('<label class="container Slot1">'+appointmentTime+
//             '<input type="radio" value="'+appointmentTime+'" name="newavslot">'+
//             '<span class="checkmark" style="background-color:darkorange;"></span> @'+
//             name+
//           '</label>')
//       }
//       else{
//         $("#newslot").append('<label class="container Slot1" style="cursor:not-allowed">'+appointmentTime+
//             '<input type="radio" value="'+appointmentTime+'" name="newavslot" disabled>'+
//             '<span class="checkmark" style="background-color:red;"></span> @'+ 
//             name+
//           '</label>')
//       }
//     }
//   }
// })
// if(isAvailable && update==false){
//   $("#newslot").append('<label class="container Slot1">'+appointmentTime+
//           '<input type="radio" value="'+appointmentTime+'" name="newavslot">'+
//           '<span class="checkmark"></span>'+
//         '</label>')
// }
// }

// //when Book button is clicked function below triggers and opens confirmation popup
// function BookSlot(){
// let bookslot=$("input[name=newavslot]:checked").val();
// let bookappt=$("#appt").val()
// if(bookdate && bookslot && bookappt){
//   $("#modalClinic").html($("#clinic").find(":selected").text())
//   $("#modalDoctor").html($("#doctor").find(":selected").text())
//   $("#modalAppt").html($("#appt").find(":selected").text())
//   $("#modalDate").html(bookdate)
//   $("#modalTime").html(bookslot)
//   $("#confirmModal").modal('show')
// }
// else{
//   alert("Please book slot & date")
// }
// }

// //when Update button is clicked function below triggers and sets slot to update
// function updateSlot(){
// upbookslot=$("#appt").val();
// if(bookdate && upbookslot && $("input[name=newavslot]:checked").val()){
//   updateFlag=true;
//   upbookdate=bookdate
//   $("#apptrow").fadeOut()
//   $(".bookingSlot").fadeOut()
//   userID=slotsBook.find(x=>x.bookDate==bookdate).slots.find(x=> x.appointmentID==upbookslot && x.doctorID==$("#doctor").val()).userID
//   alert("Please select date to update appointment")
// }
// else{
//   alert("Please select slot to update")
// }
// }

// //when confirm button is clicked on pop up function below triggers and checks if its new slot slot or updated the accordingly sends network call
// function confirmSlot(){
// if(updateFlag){
//   confirmupdateSlot()
//   updateFlag=false
// }
// $.ajax({
//   url:'/bookslot',
//   type:'POST',
//   data : { 
//     date: bookdate, 
//     appointment:$("#appt").val(), 
//     clinic:$("#clinic").val(),
//     doctor:$("#doctor").val(),
//     update:0,
//     uid:userID,
//   },
//   success:function(data){
//     $("#confirmModal").modal('hide');
//     if(data==-1){
//       alert("Slot is already booked")
//     }
//     else{
//       location.reload()
//     }
//   }
// })
// }

// //fuction below deletes old slot after confirmed
// function confirmupdateSlot(){
// if(upbookdate && upbookslot && updateFlag){
//   $.ajax({
//     url:'/bookslot',
//     type:'POST',
//     data : {
//       date: upbookdate, 
//       appointment:upbookslot,
//       update:1,
//       uid:userID,
//     },
//     success:function(data){}
//   })
// }
// }

// //function below triggers for navigation to appointments and bookings
// function showdiv(x,div){
// $(".appoint").show()
// $(".calendar").show()
// $(div).hide()
// $(x).addClass('selected').siblings().removeClass("selected")
// }
