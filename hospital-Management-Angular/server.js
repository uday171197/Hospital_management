let mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const constants = require("./constants");
const signUpRoute = require('./routes/signup');
const adminRoute = require('./routes/admin');

const app = express();


const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', 'DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use(express.static("public"))
app.use(express.json());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(signUpRoute);

app.use(adminRoute);


mongoose
  .connect(
    constants.uri, {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true,useFindAndModify:false })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.get('/', function(req, res,next){
  // var sess=req.session
 
    res.send("Hello world!");
 });

 app.post('/user', function(req, res,next){
  // var sess=req.session
    console.log(req.body);
    res.send(req.body).status(200);
 });
app.listen(port, ()=>{
    console.log("server is listning on port "+ port)
})