var express = require("express");
var fs = require("fs");
var router = express.Router();
var Course = require("../../models/trainer/Course");

router.put("/", (req, res) => {
    try{
        var body = req.body;
        var course = new Course();
        course.trainerid = body.trainerid;
        course.title = body.title;
        course.description = body.description;
        let base64image = body.image;
        course.imagepath = "coursepics/" + (Math.random() + 1).toString(36).substring(7) + ".png";
        if(base64image != "")
        {
            base64image = base64image.replace(/^data:image\/[a-z]*;base64,/, "");  
            fs.writeFile("public/" + course.imagepath, base64image, 'base64', function(err){
            });
        }
        course.mrp = body.mrp;
        course.price = body.price;
        course.status = body.status;
        course.timestamp = new Date();
        course.save().then((result) => {
            res.end(JSON.stringify({ status: "success", data: result }));
        }, (error) => {
            res.end(JSON.stringify({ status: "failed", data: error }));
        });
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.post("/", async (req, res) => {
    try{
        var body = req.body;
        let course = await Course.findById(body.id);
        course.title = body.title;
        course.description = body.description;
        let base64image = body.image;
        if(base64image != "")
        {
            course.imagepath = "coursepics/" + (Math.random() + 1).toString(36).substring(7) + ".png";        
            base64image = base64image.replace(/^data:image\/[a-z]*;base64,/, "");  
            fs.writeFile("public/" + course.imagepath, base64image, 'base64', function(err){
            });
        }
        course.mrp = body.mrp;
        course.price = body.price;
        course.status = body.status;
        course.save().then((result) => {
            res.end(JSON.stringify({ status: "success", data: result }));
        }, (error) => {
            res.end(JSON.stringify({ status: "failed", data: error }));
        });
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.delete("/", async (req, res) => {
    try{
        var body = req.body;
        await Course.findByIdAndDelete(body.id);
        res.end(JSON.stringify({ status: "success" }));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});


router.get("/:trainerid", async (req, res) => {
    try{
        let data = await Course.find({trainerid:req.params.trainerid});
        res.end(JSON.stringify({ status: "success", data: data }));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.get("/:trainerid/:id", async (req, res) => {
    try{
        let data = await Course.findById(req.params.id);
        res.end(JSON.stringify({ status: "success", data: data }));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

module.exports = router;