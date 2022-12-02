var express = require("express");
var Trainer= require("../../models/admin/Trainer");
var router = express.Router();

router.put("/", (req, res) => {
    try{
        var body = req.body;
        console.log(body);
        let trainer = new Trainer();
        trainer.name = body.name;
        trainer.email = body.email;
        trainer.mobileno = body.mobileno;
        trainer.website = body.website;
        trainer.password = body.password;
        trainer.status = body.status;
        trainer.tagline = body.tagline;
        trainer.gatewayid = body.gatewayid;
        trainer.save().then((result) => {
            res.end(JSON.stringify({ status: "success", data: result }))
        },
        (error) => {
            res.end(JSON.stringify({ status: "failed",data:error }))
        })
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});
router.post ("/", async (req, res) => {
    try{
        var body = req.body;   
        let trainer = await Trainer.findById(body.id);
        trainer.name=body.name;
        trainer.email=body.email;
        trainer.mobileno = body.mobileno;
        trainer.website = body.website;
        trainer.password=body.password;
        trainer.status = body.status;
        trainer.tagline = body.tagline;
        trainer.gatewayid = body.gatewayid;

        trainer.save().then((result) => {
            res.end(JSON.stringify({ status: "success", data: result }))
        },
        (error) => {
            res.end(JSON.stringify({ status: "failed",data:error }))
        })
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.get("/",async(req, res) => {
    try{
        let data = await Trainer.find();
        res.end(JSON.stringify({ status: "success", data:data}));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.get("/:id",async(req, res) => {
    try{
        let data = await Trainer.findById(req.params.id);
        res.end(JSON.stringify({ status: "success", data:data}));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.delete("/",async(req, res) => {
    try{
        var body = req.body;
        await Trainer.findByIdAndDelete(body.id);
        res.end(JSON.stringify({ status: "success"}));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

module.exports = router;