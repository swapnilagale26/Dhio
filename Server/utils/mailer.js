const nodemailer = require('nodemailer');


const sendMail = (link) => {
  const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: "connect@leammo.in",
      pass: "Ventura@1234"
    }
  });
  const mailOptions = {
    from: '"Leammo Team" <no-reply@leammo.com>',
    to: 'bag3557@gmail.com',
    subject: 'Registration Link',
    text: 'Hey there, it’s time to complete Leammo registration!!!',
    html: '<b>Hey there! </b><br> It’s time to complete Leammo registration!!!<br/><br/>'+link
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

module.exports = sendMail;
