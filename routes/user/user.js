var express = require("express");
var router = express.Router();
var User = require("../../models/user/User");
var Usercourse = require("../../models/user/Usercourse");
var Course = require("../../models/trainer/Course");
var Coursesection = require("../../models/trainer/Coursesection");
var Coursevideo = require("../../models/trainer/Coursevideo");

router.put('/register', async(req, res) => {
    var body = req.body;
    let userid = "";
    let existinguser = await User.find({trainerid:body.trainerid, email:body.email});
    if(existinguser.length == 0){
        let user = new User();
        user.trainerid = body.trainerid;
        user.name = body.name;
        user.email = body.email;
        user.password = Math.floor((Math.random() * 10000));
        user.timestamp = new Date();
        user = await user.save();
        userid = user._id;
    }
    else
        userid = existinguser[0]._id;

    let course = await Course.findById(body.courseid);

    let userCourse = new Usercourse();
    userCourse.trainerid = body.trainerid;
    userCourse.userid = userid;
    userCourse.courseid = course._id;
    userCourse.price = course.price;
    userCourse.status = "pending";
    userCourse.timestamp = new Date();
    
    userCourse.save().then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (error) => {
        res.end(JSON.stringify({ status: "failed", data: error }));
    });
});

router.post("/markpaid", async(req, res) => {
    let body = req.body;
    let userCourse = await Usercourse.findById(body.id);
    userCourse.status = "paid";

    //Send Mail to user and trainer also

    userCourse.save().then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (error) => {
        res.end(JSON.stringify({ status: "failed", data: error }));
    });
});

router.get("/list/:userid", async(req, res) => {
    let result = await Usercourse.find({userid:req.params.userid, status:"paid"}).populate({path:'courseid'});
    res.end(JSON.stringify({ status: "success", data: result }));
});


router.get("/get/:usercourseid", async(req, res) => {
    let usercourse = await Usercourse.findById(req.params.usercourseid);
    if(usercourse.status == "paid"){
        let course = await Course.findById(usercourse.courseid);
        let sections = await Coursesection.find({courseid:course._id}).sort({srno:1});
        let videos = await Coursevideo.find({courseid:course._id}).sort({srno:1});
        res.end(JSON.stringify({ status: "success", data: { course:course, sections:sections, vidoes:videos } }));
    }
    else{
        res.end(JSON.stringify({ status: "failed", data: "Not paid for course" }));
    }
});


module.exports = router;