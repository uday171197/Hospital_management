const mongoose = require('mongoose')
/* user will book the appointmen in particular clinic for a doctor */
const RequestedSlotSchema = mongoose.Schema({
    bookDate:{type:String, required: true},
    appointmentTime:{type:String},
    userID:{type:String},
    isApproved:{type:Boolean, default:false}
  });

module.exports = mongoose.model("requestedslot", RequestedSlotSchema);