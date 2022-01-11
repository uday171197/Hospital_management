const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    // user_id: { type: String, required: true, unique:true },
    userName:{type:String, required: true},
    userEmail:{type:String, required: true, unique:true },
    userPassword:{type:String, required: true},
    userProfile:{type:String, required: false},
    role:{type: String},
    resetToken:{type:Number},
  });

module.exports = mongoose.model("user", userSchema);