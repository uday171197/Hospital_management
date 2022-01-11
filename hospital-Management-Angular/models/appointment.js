const mongoose = require('mongoose')
/* subadmin can add multiple unique appointment with their time slots */
const appointmentSchema = mongoose.Schema({
      appointmentTime:{type:String, required: true},
      date:{type:String},
  });

module.exports = mongoose.model("appointment", appointmentSchema);