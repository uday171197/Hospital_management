const mongoose = require('mongoose')
/*admin will add clinic after he adds subadmins and assigns the clinic to subadmin
subadmin will add doctors in clinic */
const clinicSchema = mongoose.Schema({
    clinicName:{type:String, required: true},
    subadmin:[{
        subadminID:{type:String}
    }],
    doctors:[{
        doctorName:{type:String},
    }],
    Email:{type:String, required: true},
    Address:{type:String, required: true},
    contactDetails:{type: String, required: true},
});

module.exports = mongoose.model("clinic", clinicSchema);