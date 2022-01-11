const express = require('express')

// const CustomerController = require("../controllers/signup");
const AdminController = require('../controllers/admin');

const router = express.Router();

router.get("/PatientDetails/:_id?/", AdminController.getPatientDetails);
router.get("/NurseDetails/:_id?/", AdminController.getNurseDetails);
router.get("/NurseAllDetails", AdminController.getNurseAllDetails);
router.post("/addnewuser", AdminController.addNewUser);
router.delete("/deleteuser/:id/",AdminController.deleteUser);
router.get('/addUser', AdminController.addUserDashboard);
router.get('/appointment', AdminController.appointment);
router.post('/appointment', AdminController.addAppointment);
router.delete('/appointment/:id/?', AdminController.deleteAppointment);

module.exports = router;