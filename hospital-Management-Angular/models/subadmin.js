const mongoose = require('mongoose')
/*admin has to add subadmin in order to create clinic*/
const subadminSchema = mongoose.Schema({
    subadminName:{type:String, required: true},
    subadminEmail:{type:String, required: true},
    subadminPassword:{type:String, required: true},
  });

module.exports = mongoose.model("subadmin", subadminSchema);