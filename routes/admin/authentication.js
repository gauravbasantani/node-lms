var express = require("express");
var Admin = require("../../models/admin/Admin");
var nodemailer = require('nodemailer');

var router = express.Router();

router.post("/login", async (req, res) => {
    try{
        var body = req.body;
        let admin = await Admin.find({email:body.email, password:body.password});
        if(admin.length > 0){
            res.end(JSON.stringify({ status: "success", data: admin[0] }));
        }
        else{
            res.end(JSON.stringify({ status: "failed", data: "Invalid credentials" }));
        }
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});


router.post("/forgotpassword", async (req, res) => {
    // try{
        var body = req.body;
        let admin = await Admin.find({email:body.email});
        if(admin.length > 0){
            admin = admin[0];
            console.log(admin);
            //Send Password email
            let subject = "Password for Login";
            let body = 'Hello ' + admin.name + ", your password for login is " + admin.password;
       
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'patelfarhan431@gmail.com',
                  pass: 'iforvtfibuketxca'
                }
              });
              
              var mailOptions = {
                from: 'patelfarhan431@gmail.com',
                to: admin.email,
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
           
            
              res.end(JSON.stringify({ status: "success", data: "Password sent" }));
        }
        else{
            res.end(JSON.stringify({ status: "failed", data: "Email doen't exists." }));
        }
    // }catch(ex){
    //     res.end(JSON.stringify({ status: "failed", data: ex }));
    // }
});

module.exports = router;
