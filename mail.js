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


app.get("/getAdToken", (req, res) => {
  
  console.log('>>>>   req for token')

      res.json({ token: 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LTEuY2VyIn0.eyJpZCI6IjE2MTg0Njg1ODM4OTlfZWEyMTIwYTgtZTA5Ni00ZjQzLWI1YTYtMjg4OGI0YmVhOWNlX3VlMSIsImNsaWVudF9pZCI6IjVhOGRjYzJjZmE3MTQ3MmNiZmE0ZmI1MzY3MWM0NWVkIiwidXNlcl9pZCI6Ijg1OTkxQUMwNjA3NDJDRDUwQTQ5NUU3MEBBZG9iZUlEIiwic3RhdGUiOiIiLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiI4NTk5MUFDMDYwNzQyQ0Q1MEE0OTVFNzBAQWRvYmVJRCIsImZnIjoiVkxMNllNSUxWTE81Tkg0R0NNWkxSSFFBMzQ9PT09PT0iLCJzaWQiOiIxNjE4NDY4NTgzMzg1XzQ2MGNiNmU2LTg3NzEtNDEzYS05YzYzLWRhYjA2OTg1YjRjM191ZTEiLCJtb2kiOiI1MGQ2M2IzZiIsIm9jIjoicmVuZ2EqbmExcioxNzhkNDNlYjM3OSpaNlNNNjRBWUM1NkFYRjBZVzJGOE41WVcxQyIsInJ0aWQiOiIxNjE4NDY4NTgzODk5XzJlZjlhOTMzLWU5ZmMtNGVjOC04Njg5LTI4OTU1NmE4MDc0N191ZTEiLCJydGVhIjoiMTYxOTY3ODE4Mzg5OSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoib3BlbmlkLEFkb2JlSUQscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCxhZGRpdGlvbmFsX2luZm8uam9iX2Z1bmN0aW9uIiwiY3JlYXRlZF9hdCI6IjE2MTg0Njg1ODM4OTkifQ.OuWZBbEjaResJwx2XyvpkTrAxSFuHXZPY0FjYhNtOqM9GN5HKIn2O1-m-eh9qmYEpw-vyAb3fFoT1xDdhEl2_Pm42riO0m_65-m_p5lsaKICKbs6OuBthDgmhVenIWG1qBRQpLPzUqYFwxCgDvpdrzJ-ERKeEeybBAazLbBO0vuHPyiWa1-_BuS602k3ZcYY6jN5AXkQoqPxp7eNbqH0E0uejZnndSPm6ChNyuens-qxY_quZle0F6JdZXmFYUugqJr13QFhgTycessu7i_HUxVZINceut0ktj_krtUETcBki1OxRWDhhiQrl_Ng7KGnio_NwE1JhK2Wa3ufCuR08A' });
  
});


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
