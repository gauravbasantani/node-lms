var express = require("express");
var Admin= require("../../models/admin/Admin");
var router = express.Router();

router.put("/", (req, res) => {
    try{
        var body = req.body;   
        let admin = new Admin();
        admin.name = body.name;
        admin.email = body.email;
        admin.password = body.password;
        admin.save().then((result) => {
            res.end(JSON.stringify({ status: "success", data: result }));
        },
        (error) => {
            res.end(JSON.stringify({ status: "failed",data:error }));
        });
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.post("/", async (req, res) => {
    try{
        var body = req.body;
        let admin = await Admin.findById(body.id);
        admin.name = body.name;
        admin.email = body.email;
        admin.password = body.password;
        admin.save().then((result) => {
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
        await Admin.findByIdAndDelete(body.id);
        res.end(JSON.stringify({ status: "success" }));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.get("/",async(req,res)=>{
    try{
        let data = await Admin.find();
        res.end(JSON.stringify({status:"success", data:data}));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

router.get("/:id",async(req,res)=>{
    try{
        let data=await Admin.findById(req.params.id);
        res.end(JSON.stringify({status:"success",data:data}));
    }catch(ex){
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});

module.exports = router;
