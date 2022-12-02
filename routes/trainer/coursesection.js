var express = require("express");
var router = express.Router();
var Coursesection = require("../../models/trainer/Coursesection");

router.put('/', (req, res) => {
    try{
        var body = req.body;
        let coursesection = new Coursesection();
        coursesection.courseid = body.courseid;
        coursesection.name = body.name;
        coursesection.srno = body.srno;
        coursesection.save().then((result) => {
            res.end(JSON.stringify({ status: "success", data: result }));
        }, (error) => {
            res.end(JSON.stringify({ status: "failed", data: error }));
        });
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.post('/', async (req, res) => {
    try{
        var body = req.body;
        let coursesection = await Coursesection.findById(body.id);
        coursesection.name = body.name;
        coursesection.srno = body.srno;
        coursesection.save().then((result) => {
            res.end(JSON.stringify({ status: "success", data: result }));
        }, (error) => {
            res.end(JSON.stringify({ status: "failed", data: error }));
        });
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.delete('/', async (req, res) => {
    try{
        var body = req.body;
        await Coursesection.findByIdAndDelete(body.id);
        res.end(JSON.stringify({ status: "success" }));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.get('/:courseid', async (req, res) => {
    try{
        let data = await Coursesection.find({courseid:req.params.courseid}).sort({srno:1});
        res.end(JSON.stringify({ status: "success", data: data }));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.get('/:courseid/:id', async (req, res) => {
    try{
        let data = await Coursesection.findById(req.params.id);
        res.end(JSON.stringify({ status: "success", data: data }));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.patch('/updatesrno/:id', async (req, res) => {
    try{
        let coursesection = await Coursesection.findById(req.params.id);
        var body = req.body;
        coursesection.srno = body.srno;
        console.log(body);
        coursesection.save().then((result) => {
            res.end(JSON.stringify({ status: "success", data: result }));
        }, (error) => {
            res.end(JSON.stringify({ status: "failed", data: error }));
        });
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});


module.exports = router;