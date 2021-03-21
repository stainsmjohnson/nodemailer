"use strict";
const nodemailer = require("nodemailer");
const express = require("express");
var multer = require("multer");
var upload = multer();

const app = express();
app.use(express.json());
app.use(upload.array());

app.post("/send", (req, res) => {
  const toaddress = req.body.to;
  sendmail({
    mail: toaddress,
  })
    .then(() => {
      res.json({ success: true });
    })
    .catch(() => {
      res.json({ success: false });
    });
});

app.listen(5000, () => {
  console.log("server stated");
});

async function sendmail({ mail }) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "grahamstains1999@gmail.com", // generated ethereal user
      pass: "interNational", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Transaction Manager" <ccrd@security.com>',
    to: mail,
    subject: "Critical security alert",
    text:
      "Someone just tried to make a fradulent transaction on your account, but you should check what happened. Review your account activity to make sure that no one else has access.",
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
