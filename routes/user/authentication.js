var express = require("express");
var User= require("../../models/user/User");
var nodemailer = require('nodemailer');

var router = express.Router();

router.post("/login", async (req, res) => {
    try{
        var body = req.body;
        let user = await User.find({trainerid:body.trainerid, email:body.email, password:body.password});
        if(user.length > 0){
            res.end(JSON.stringify({ status: "success", data: user[0] }));
        }
        else{
            res.end(JSON.stringify({ status: "failed", data: "Invalid credentials" }));
        }
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});


router.post("/forgotpassword", async (req, res) => {
    try{
        var body = req.body;
        let user = await User.find({trainerid:body.trainerid, email:body.email});
        if(user.length > 0){
            //Send Password email
            user = user[0];
            //Send Password email
            let subject = "Password for Login";
            let body = 'Hello ' + user.name + ", your password for login is " + user.password;
       
            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'patelfarhan431@gmail.com',
                  pass: 'iforvtfibuketxca'
                }
              });
              
              var mailOptions = {
                from: 'patelfarhan431@gmail.com',
                to: user.email,
                subject: subject,
                text: body
              };
              console.log(mailOptions);
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            res.end(JSON.stringify({ status: "success", data: "Password sent to email." }));
        }
        else{
            res.end(JSON.stringify({ status: "failed", data: "Email doen't exists." }));
        }
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

module.exports = router;
