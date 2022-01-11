const user = require("../models/user");
const booking = require("../models/booking");
var sha256 = require('js-sha256').sha256;
const constants = require('../constants');
const nodemail = require('../nodemail');
function randomNumber(minimum, maximum){
    return Math.round( Math.random() * (maximum - minimum) + minimum);
}
module.exports.homepage = (req,res,next)=>{
    var dt=new Date().toISOString().slice(0, 10)
    booking.find({
        bookDate:{$gte:dt}
    }).then((slotdata)=>{
        // console.log(data)
        res.render('signup/signin',{
            user:(req.session.userDetails) ? req.session.userDetails : '',
            slotBook:slotdata ? slotdata : []
          });
    })
}

module.exports.signup = (req,res,next)=>{
    // when user signs up data is stored here

    console.log(req.body.user)


        var userEntry=new user({
            userEmail : req.body.user.formdata.email,
            userPassword:sha256(req.body.user.formdata.password),
            userName:req.body.user.formdata.name,
            role : req.body.user.formdata.usertype,
            resetToken:randomNumber(11111,99999),
        });
        userEntry.save().then((response)=>{
            response.userPassword=""
            req.session.userDetails=response
            if(response.role=="patient"){
                return res.status(200).send({status:"1",data:response});
            }
            else if(response.role=="nurse"){
                return res.status(200).send({status:"2",data:response});
            }
        }).catch((error)=>{
            console.log(error)
            return res.status(200).send({status:"0",data:[]});
        });
}

module.exports.signin = (req,res,next)=>{
    // when user signs in we validate credentials and send success
    user.findOne({
        userEmail : req.body.user.email, 
        userPassword:sha256(req.body.user.password)
    }).then((response)=>{
        if(response.role=="patient"){
            response.userPassword=""
            req.session.userDetails=response
            res.status(200).send({'status':"1",'data':response});
        }
        else if(response.role == "nurse"){
            response.userPassword=""
            req.session.userDetails=response
            res.status(200).send({'status':"2",'data':response});
        }
        else if(response.role == "SubAdmin"){
            response.userPassword=""
            req.session.userDetails=response
            res.status(200).send({'status':"3",'data':response});
        }
        else
            return res.status(200).send({'status':"0"});
    }).catch((error)=>{
        console.log(error)
        return res.status(200).send({'status':"0"});
    });
}

module.exports.admin_signin = (req,res,next)=>{
    // when admin signs in we validate credentials and send success
    console.log(req.body)
    user.findOne({
        userEmail : req.body.user.email,
        userPassword:sha256(req.body.user.password)
    }).then((response)=>{
        console.log(response)
        if(response.role=="admin"){
            response.userPassword=""
            req.session.userDetails=response
            res.status(200).send({ statu:200,message:'Login as Admin',data:{'data':req.session.userDetails,'flag':1}});
        }
        else{
            res.status(200).send({ statu:201,message:'error while login',data:{'flag':0}});
        }      
    }).catch((error)=>{
        console.log('error------------------------>',error)
        res.status(200).send({ statu:400,message:'error while login',data:{'flag':0}});
         
    });
}
