const nodemail = require('./nodemail');
const ical = require('ical-generator');

module.exports.invite=function(starttime, endtime, summary, location, name , email, subject, body) {
    const cal = ical();
    cal.createEvent({
        start: starttime,         // eg : moment()
        end: endtime,             // eg : moment(1,'days')
        summary: summary,         // 'Summary of your event'
        location: location,       // 'Delhi'
        organizer: {
            name: name,
            email: email
        },
    });
    nodemail.mail(email,subject,body,cal);
}
