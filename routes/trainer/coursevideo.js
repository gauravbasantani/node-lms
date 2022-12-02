var express = require("express");
var router = express.Router();
var Coursevideo = require("../../models/trainer/Coursevideo");

router.put("/", (req, res) => {
    try{
        var body = req.body;
        var coursevideo = new Coursevideo();
        coursevideo.courseid = body.courseid;
        coursevideo.sectionid = body.sectionid;
        coursevideo.name = body.name;
        coursevideo.description = body.description;
        coursevideo.srno = body.srno;
        coursevideo.vfrom = body.vfrom;
        coursevideo.videocode = body.videocode;
        coursevideo.save().then((result) => {
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
        var coursevideo = await Coursevideo.findById(body.id);
        coursevideo.courseid = body.courseid;
        coursevideo.sectionid = body.sectionid;
        coursevideo.name = body.name;
        coursevideo.description = body.description;
        coursevideo.srno = body.srno;
        coursevideo.vfrom = body.vfrom;
        coursevideo.videocode = body.videocode;
        coursevideo.save().then((result) => {
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
        await Coursevideo.findByIdAndDelete(body.id);
        res.end(JSON.stringify({ status: "success" }));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.get("/:sectionid", async (req, res) => {
    try{
        var data = await Coursevideo.find({sectionid:req.params.sectionid}).sort({srno:1});
        res.end(JSON.stringify({ status: "success", data: data }));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.get("/:sectionid/:id", async (req, res) => {
    try{
        var data = await Coursevideo.findById(req.params.id);
        res.end(JSON.stringify({ status: "success", data: data }));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.patch("/updatesrno/:id", async (req, res) => {
    try{
        var body = req.body;
        var coursevideo = await Coursevideo.findById(req.params.id);
        coursevideo.srno = body.srno;
        coursevideo.save().then((result) => {
            res.end(JSON.stringify({ status: "success", data: result }));
        }, (error) => {
            res.end(JSON.stringify({ status: "failed", data: error }));
        });
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

module.exports = router;
