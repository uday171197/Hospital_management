/* given roues and their controler*/
const express = require('express')
const request = require("request");
const constants = require("../constants");
const CustomerController = require("../controllers/signup");
const homeController = require("../controllers/homepage");
const booking = require("../models/booking");
const user = require("../models/user");

const router = express.Router();

router.post("/signup", CustomerController.signup);
router.post("/signin", CustomerController.signin);
router.post("/admin_signin", CustomerController.admin_signin);
router.post("/bookslot", homeController.bookSlot);
router.get('/patienthome', homeController.patienthome);
router.get('/nursehome', homeController.nursehome);
router.post('/addrequestedslot', homeController.addRequestedSlot);
router.post('/approverequestedslot', homeController.approveRequestedSlot);
router.get('/getrequestedslot', homeController.getRequestedSlot);
router.delete('/requestedslot/:id', homeController.deleteRequestedSlot);

router.get('/admin-login', function (req, res) {
  res.render('signup/admin-login',{
    user:(req.session.userDetails) ? req.session.userDetails : ''
  });
});

router.get('/register', function (req, res) {
  let result= (typeof req.session.userDetails !== "undefined" ? 'signup/signin' : 'signup/signup');
    res.render(result,{
      user:(req.session.userDetails) ? req.session.userDetails : ''
    });
});

router.get('/login', function (req, res) {
    res.render('signup/login');
});

router.get('/onboard', function (req, res) {
    res.render('signup/onboard',{
      user:(req.session.userDetails) ? req.session.userDetails : ''
    });
});

router.get('/homepage', CustomerController.homepage);

router.get('/forgotpassword', function (req, res) {
    res.render('forgotpass/forgot-password',{
      user:(req.session.userDetails) ? req.session.userDetails : ''
    });
});





router.get('/adminhome', function (req, res) {
  console.log(constants.websiteURL+ "PatientDetails/")
  request(constants.websiteURL+ "PatientDetails/", { json: true }, (err, UserRes, UserData) => {
    console.log('PatientDetails'+JSON.stringify(UserData));
    return res.send({'PatientDetails':UserData});
  });
});

module.exports = router;