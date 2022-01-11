const mongoose = require('mongoose')
/* user will book the appointmen in particular clinic for a doctor */
const bookingSchema = mongoose.Schema({
    bookDate:{type:String, required: true},
    slots:[{
        appointmentID:{type:String},
        userID:{type:String},
    }]
  });

module.exports = mongoose.model("booking", bookingSchema);