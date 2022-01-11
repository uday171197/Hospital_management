const nodemailer = require("nodemailer");
module.exports.mail=function(receiver,subject,body,calendarObj=null) {
  bcc=receiver.split(",")
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'no.reply.hospital4@gmail.com',
      pass: 'reply@hospital',
    },
  });

  transporter.sendMail({
    from: 'hospital',
    to: bcc.length > 1 ? '' : receiver,
    bcc: bcc.length > 1 ? receiver :'',
    subject: subject,
    html: body,
    alternatives:{
      contentType:calendarObj ? "text/calendar" : 'text/html',
      content: calendarObj ? new Buffer(calendarObj.toString()) : body
    }
  },(err,res)=>{
      console.log(err,res)
      transporter.close();
  });
}
