const user = require("../models/user");
const booking = require("../models/booking");
const clinic = require("../models/clinic");
const appointment = require("../models/appointment");
const requestedSlot = require("../models/requestedslot");
const calendarinvite = require("../calendarinvite");
const constants = require("../constants");

function convertTo24Hour(time) {
  var hours = parseInt(time.split(":")[0]);
  if(time.indexOf('am') != -1 && hours == 12) {
      time = time.replace('12', '0');
  }
	else if(time.indexOf('am') != -1 && hours < 11){
		time="0"+time
	}
  if(time.indexOf('pm')  != -1 && hours < 12) {
      time = time.replace(hours, (hours + 12));
}
  return time.replace(/(am|pm)/, '').replace(/\s/g, '');
}

function deleteBooking(bookdate, userID, appointmentID){
  return booking.findOneAndUpdate(
    {bookDate:bookdate},
    {
        bookDate:bookdate,
        $pull: { 
            slots:{
                userID:userID,
                appointmentID:appointmentID,
            }
        },
    })
}
function addBooking(bookdate, userID, appointmentID){
  
  return booking.findOneAndUpdate({bookDate:bookdate},
    {
        bookDate:bookdate,
        $push: { slots:
            {
                userID:userID,
                appointmentID:appointmentID,
            }
        }
    },
    { upsert: true, new: true})
}
module.exports.bookSlot = (req,res,next)=>{
  console.log('booking data-------------------->',req.body.user)
  var bookdate=req.body.user.date
  var userID=req.body.user.userID
  if(req.body.user.update==1){
    var newDate= req.body.user.newDate
      //when update flag is send we delete older appointment of user
    booking.findOne({
        bookDate:newDate,
        'slots.appointmentID':req.body.user.appointment,
    }).then((data)=>{
      console.log(data)
      if(data != null){
          return res.send('-1')
      }
      else{
        /****find appointment updated for datewise****/
        appointment.findById(req.body.user.appointment)
        .then(response=>{
          if(response.date){
            console.log("appoinment is datewise")
            var appointmentTime=response.appointmentTime
            appointment.findOne({
              date: newDate,
              appointmentTime:appointmentTime
            })
            .then(data=>{
              if(data){
                var newAppointmentID=data._id
                console.log("appointment slot found",data)
                booking.findOne({
                  'slots.appointmentID':data._id
                })
                .then(data=>{
                  if(data){
                    console.log("the slot is already booked")
                    res.status(200).send("-1")
                  }
                  else{
                    console.log("available to book")
                    //delete booking with old appointmentID 
                    deleteBooking(bookdate, userID, req.body.user.appointment).then(()=>{
                      // added booking with new appointmentID
                      addBooking(newDate, userID, newAppointmentID).then(()=>{
                        res.send('1')
                      })
                    })
                  }
                })
              }
              else{
                console.log("no appoinment found")
                res.status(200).send("-2")
              }
            })
          }else{
            console.log("appoinment is not datewise")
            deleteBooking(bookdate, userID, req.body.user.appointment).then(()=>{
              addBooking(newDate, userID, req.body.user.appointment).then(()=>{
                res.send('1')
              })
            })
          }
        })
      }
    });
  }
  else{
      //here appointment is booked for user
      booking.findOne({
          bookDate:bookdate,
          'slots.appointmentID':req.body.user.appointment,
      }).then((data)=>{
          console.log(data)
          if(data != null){
              return res.send('-1')
          }
          else{
            addBooking(bookdate, userID, req.body.user.appointment).then(()=>{
              res.send('1')
            })
          }
          // console.log(data)
      })
  }
}
module.exports.patienthome = (req,res,next)=>{
  //when user opens patient dashboard we transfer all appointments, clinics, doctors from here
    userD=req.session.userDetails
    console.log('session data------------------->',req.session.userDetails)
    if(userD && userD.role=='nurse'){
      res.writeHead(302, {'Location': constants.websiteURL + 'nursehome'});
      res.end();
      return false
    }
    var dt=new Date().toISOString().slice(0, 10)
      booking.find({
          bookDate:{$gte:dt}
        },
        [
          'bookDate','slots'
        ],
        {
          sort:{
            bookDate: 1 //Sort by Date Added DESC
          }
        }).then((slotdata)=>{
          console.log(slotdata)
            appointment.find().then((appointments)=>{
              var userDet = req.session.userDetails ? req.session.userDetails :[]
              user.find({},[
                '_id','userName'
              ])
              .then((data)=>{
                return res.send({'user':userDet,
                  'slotBook':slotdata ? slotdata : [],
                  'allUsers':data,
                  'appointments':appointments,})
                });
              })
            })
        }

  
module.exports.nursehome = (req,res,next)=>{
  //when user opens patient dashboard we transfer all appointments, clinics, doctors from here
  console.log(req.session.userDetails)
  userD=req.session.userDetails
  if(userD && userD.role=='patient'){
    res.writeHead(302, {'Location': constants.websiteURL + 'patienthome'});
    res.end();
    return false
  }
    var dt=new Date().toISOString().slice(0, 10)
      booking.find({
          bookDate:{$gte:dt}
        },
        [
          'bookDate','slots'
        ],
        {
          sort:{
            bookDate: 1 //Sort by Date Added DESC
          }
        }).then((slotdata)=>{
          console.log(slotdata)
          requestedSlot.find({
            isApproved:false
          }).then((requested_data)=>{
            appointment.find().then((appointments)=>{
              var userDet = req.session.userDetails ? req.session.userDetails :[]
              user.find({},[
                'role',
              'userEmail',
              'userName',
              '_id'
              ])
              .then((data)=>{
                return res.send({
                   'user':userDet,
                  'slotBook':slotdata ? slotdata : [],
                  'allUsers':data,
                  'appointments':appointments,
                  'requestedData':requested_data})
                });
                });
              })
            })

  }

  module.exports.addRequestedSlot = (req, res, next) => {
    console.log('appointment data------------------------->',req.body.user)
    var appointment = new requestedSlot(req.body.user);
    appointment.save().then(response => {
      res.status(200).send('1');
    }).catch(error =>{
      res.send("0");
    })
  }

  module.exports.getRequestedSlot = (req, res, next)=>{
    requestedSlot.find({}).then(response => {
      // console.log('requested_data ------------------------>',response)
      return res.send({'data':response,'flag':'1'});
    }).catch(error=>{
      return res.send({'flag':'1'});
    })
  }

  module.exports.approveRequestedSlot = (req, res, next)=>{
    requestedSlot.findByIdAndUpdate(req.body.id,{
      isApproved:true
    }).then(response => {
      var newappointment = new appointment({
        appointmentTime: response.appointmentTime,
        date: response.bookDate
      });
      newappointment.save().then(response => {
        return res.status(200).send('1');
      }).catch(error=>{
        return res.status(200).send('0');
      });
    }).catch(error=>{
    })
  }

  module.exports.deleteRequestedSlot = (req, res, next)=>{
    requestedSlot.findByIdAndDelete(req.params.id).then(response => {
      return res.status(200).send('1');
    }).catch(error=>{
      return res.status(200).send('0');
    })
  }