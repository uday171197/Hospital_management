//Importing all DataBase Models
const userModel = require("../models/user");
const booking = require("../models/booking");
const clinicModel = require("../models/clinic");
const appointmentModel = require("../models/appointment");

//Importing required packages
var sha256 = require('js-sha256').sha256;
const constants = require('../constants');
const request = require("request");
const { response } = require("express");
const user = require("../models/user");

function randomNumber(minimum, maximum){
    return Math.round( Math.random() * (maximum - minimum) + minimum);
}

// This endpoint fetches Patient related data from DataBase
module.exports.getPatientDetails = (req,res,next)=>{
  console.log("enterd get patient details")
  //Fetch all Patients Details
  if(req.params['_id'] == undefined){
    var searchQuery = {role: "patient"};
  }
  //Fetch Patient Details whose Id is mentioned
  else{
    var searchQuery = { _id: { $in: JSON.parse(req.params['_id']) }}
  }
  userModel.find(searchQuery).then((response)=>{
    // console.log(response);
    res.send(response)
  }).catch((error)=>{
    console.log(error)
    res.send(error)
  })
}

// This endpoint fetches Nurse related data from DataBase
module.exports.getNurseDetails = (req,res,next)=>{
  console.log("enterd get nurse details");
  //Fetch all Nurses Details
  if(JSON.parse(req.params['_id']).clinicID != undefined){
    var searchQuery = {clinicID: JSON.parse(req.params['_id']).clinicID, role: "nurse"};
  }
  else if(req.params['_id'] == undefined){
    var searchQuery = {role: "nurse"};
  }
  //Fetch Nurse Details whose Id is mentioned
  else{
    var searchQuery = { _id: { $in: JSON.parse(req.params['_id']) }}
  }
  userModel.find(searchQuery).then((response)=>{
    // console.log(response);
    res.send(response)
    return res.send(response);
  }).catch((error)=>{
    console.log(error)
    res.send(error)
    return res.send([]);
  })
}

module.exports.getNurseAllDetails = (req,res,next)=>{
  console.log("enterd get nurse details");
  //Fetch all Nurses Details
  var searchQuery = {role: "nurse"};
  userModel.find(searchQuery).then((response)=>{
    console.log(response);
    // res.send(response)
    return res.send(response);
  }).catch((error)=>{
    console.log(error)
    // res.send(error)
    return res.send([]);
  })
}


//Controller to add new User to DataBase
module.exports.addNewUser = (req,res,next)=>{
  console.log('new User Data -------->'+ JSON.stringify(req.body))
  var userData = {
    userEmail : req.body.user.email,
    userPassword:sha256(req.body.user.password),
    userName:req.body.user.name,
    role: req.body.user.usertype,
    resetToken:randomNumber(11111,99999),
  }
  var userEntry=new userModel(userData);

  userEntry.save().then((response)=>{
      console.log('response data ------------------------>',response)
      return res.status(200).send('1');
  }).catch((error)=>{
    console.log(error)
    return res.status(400).send("0");
  });
}

//Controller to Delete User
module.exports.deleteUser = (req,res,next)=>{
  console.log("entered delete user")
  console.log(req.params.id)
  booking.updateMany(
    {$pull:{'slots':{userID:req.params.id}}}
  ).then(r=>{
    clinicModel.updateMany(
      {$pull:{'subadmin':{subadminID:req.params.id}}}
    ).then(clinicRes=>{
      console.log('clinicRes------------------>'+JSON.stringify(clinicRes));
      userModel.deleteOne({_id:req.params.id}).then((response)=>{
        // console.log(response)
        return res.status(200).send('1');
      }).catch((error)=>{
        return res.status(400).send('0');
      });
    }).catch((error)=>{
      return res.send('0');
    })
  }).catch((error)=>{
    return res.status(400).send('0');
  });
}

//Controller to Add clinic
module.exports.newClinic = (req, res, next) => {
  console.log('Clinic Data: --------------------->'+ JSON.stringify(req.body.user));
  var newClinic = new clinicModel(req.body.user);
  newClinic.save().then((response)=>{
    // res.status(200).send(response);
    return res.status(200).send('1');
  }).catch((error)=>{
      // res.status(200).send(response);
      return res.status(400).send('0');
  });
}

//Render page to Add and Display Sub Admin
module.exports.addUserDashboard = (req, res, next) => {
  request(constants.websiteURL+ "clinic/", { json: true }, (err, response, data) => {
    request(constants.websiteURL+ "SubAdminDetails/", { json: true }, (err, subAdminResponse, subAdmin) => {
      res.render('dashboard/adminadduser',{
        subAdmin: subAdmin,
        clinic: data,
        user:(req.session.userDetails) ? req.session.userDetails : '',
      });
    });
  });
}

//Fetch all the Appointment Details
module.exports.appointmentDetails = (req, res, next)=>{
  appointmentModel.find({}).then(response => {
    next(response);
  }).catch(error=>{
    next(error);
  })
}

//Add new Appointment Type
module.exports.addAppointment = (req, res, next) => {
  console.log('appointment data------------------------->'+req.body.user)
  var appointment = new appointmentModel(req.body.user);
  console.log('appointment---------------------------->',appointment)
  appointment.save().then(response => {
    res.status(200).send('1');
  }).catch(error =>{
    res.send("0");
  })
}

//Delete particular appointment
module.exports.deleteAppointment = (req, res, next) => {
  console.log("parameter value ---------------------------->"+ JSON.stringify(req.params.id));
  // console.log("res value ---------------------------->"+ JSON.parse(res));
  booking.updateMany(
    {$pull:{'slots':{appointmentID:req.params.id}}}
  ).then(r=>{
    appointmentModel.deleteOne({_id: req.params.id}).then(response => {
      return res.send('1');
    }).catch(error => {
      return res.send('0');
    })
  })
}

//Render Page to Add appointment and Display all the Appointments
module.exports.appointment = (req, res, next) => {
  id = (req.session.userDetails) ? req.session.userDetails.clinicID : undefined,
  this.appointmentDetails(undefined,"",function(value){
    // console.log('value'+value)
    return res.send(value);
  })
}