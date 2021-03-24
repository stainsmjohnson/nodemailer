"use strict";
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors")
var multer = require("multer");
var bodyParser = require("body-parser");
var upload = multer();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(upload.array());
app.use(cors())

app.post("/send", (req, res) => {
  console.log(req.body)
  const toaddress = req.body.to;
  console.log('>>>>   toaddre' ,toaddress)
  sendmail({
    mail: toaddress,
  })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
    console.log('sss ',err.message)
      res.json({ success: false });
    });
});

app.listen(PORT, () => {
  console.log("server stated");
});

async function sendmail({ mail }) {
    console.log('>>>>   sendmaul' ,mail)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "nclient007@gmail.com", // generated ethereal user
      pass: "finalyearproject", // generated ethereal password
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
