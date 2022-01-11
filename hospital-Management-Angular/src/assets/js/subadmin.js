var deleteDoctor = "";
var deleteNurseID = "";
var deleteAppointmentID = "";

// Function to add Doctor to specific Clinic
$("#addDoctor").on('submit', function(e){
    e.preventDefault();
    if($("#doctorsName").val() == ""){
        $("#fullname").show();
    } 
    else{
        $.ajax({
            url:'/doctor',
            type:'PUT',
            data:$("#addDoctor").serialize(),
            success:function(res){
            alert("Doctor Added");
            location.reload();
            },
            error:function(){
            alert("Some Error Occurred");
            }
        });
    }
});

//Function to display confirmation Pop-up to delete Doctor
function confirmDeleteUser(id){
    deleteDoctor = id;
    $("#deleteUserModal").modal("show");
}

//Function to send data to backend for deleting Doctor
function deleteUser(clinicID){
    $.ajax({
      url:'/doctor',
      type:'PUT',
      data:{doctorID: deleteDoctor,clinicID:clinicID,type:"delete"},
      success:function(res){
          alert("User Deleted")
          location.reload();
      },
      error:function(){
        alert("Some Error Occurred");
      }
    });
}

//Function for adding taking form data for adding user and sending it to Backend
$("#addnewuserForm").on('submit', function(e){
    e.preventDefault(); 
    if ((document.addnewuserform.name.value).length < 3) {
      document.getElementById("fullname").style.display = "block";
      return false;
    }
    else if ((document.addnewuserform.name.value).length > 3) {
      document.getElementById("fullname").style.display = "none";
      
    }
    if ((document.addnewuserform.password.value).length < 8) {
      document.getElementById("password").style.display = "block";
      return false;
    }
    else if ((document.addnewuserform.password.value).length >= 8) {
      document.getElementById("password").style.display = "none";
    }
    console.log($("#addnewuserForm").serialize())
    $.ajax({
      url:'/addnewuser',
      type:'post',
      data:$("#addnewuserForm").serialize(),
      success:function(res){
        alert("User Added");
        location.reload();
      },
      error:function(){
        alert("Some Error Occurred");
      }
    });
});

//Function to display confirmation Pop-up to delete Doctor 
function confirmDeleteNurse(id){
    deleteNurseID = id;
    $("#deleteUserModal").modal("show");
}

//Function to send data to backend to delete Nurse
function deleteNurse(){
console.log(deleteNurseID)
$.ajax({
    url:'/deleteuser',
    type:'delete',
    data:{'_id': deleteNurseID},
    success:function(res){
        alert("User Deleted")
        location.reload();
    },
    error:function(){
    alert("Some Error Occurred");
    }
});
}

//Function to Validate Appointment data and send it to Backend
$("#addAppointment").on('submit', function(e){
  e.preventDefault();
  var isDuplicate = false
  for(i=0; i < $(".appointmentTypes").length; i++){
    console.log($(".appointmentTypes").eq(i).children('td').eq(0).text());
    if($(".appointmentTypes").eq(i).children('td').eq(0).text().toLowerCase() == $("#appointmentType").val().toLowerCase()){
      isDuplicate = true;
      break;
    }
  }
  if($("#appointmentType").val() == "" || isDuplicate){
    $("#fullname").show();
  }
  else if($("#appointmentTime").val() == "" || ($("#appointmentTime").val().match(/([0-9][0-2]?:[0-5][0-9] ?[PA][M] ?- ?[0-9][0-2]?:[0-5][0-9] ?[PA][M])/i)) == null){
    $("#appointmentTimeError").show();
  }
  else{
    $.ajax({
      url:'/appointment',
      type:'post',
      data:$("#addAppointment").serialize(),
      success:function(res){
        alert("Appointment Added");
        location.reload();
      },
      error:function(){
        alert("Some Error Occurred");
      }
    });
  }
});

//Function to display confirmation Pop-up to delete Appointment
function deleteAppointmentConfirm(id){
  deleteAppointmentID = id;
  $("#deleteUserModal").modal("show");
}

//Function to send data to backend to delete Appointment
function deleteAppointment(){
  $.ajax({
    url:'/appointment',
    type:'delete',
    data:{'id': deleteAppointmentID},
    success:function(res){
        alert("Appointment Deleted")
        location.reload();
    },
    error:function(){
    alert("Some Error Occurred");
    }
  });
}