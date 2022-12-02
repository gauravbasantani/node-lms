var Inquiry = require("../../models/admin/Inquiry");
var express = require("express");
var router = express.Router();

router.put("/", (req, res) => {
  try {
    var body = req.body;
    var inquiry = new Inquiry();
    inquiry.name = body.name;
    inquiry.email = body.email;
    inquiry.mobileno = body.monileno;
    inquiry.message = body.message;
    inquiry.feedback = "";
    inquiry.status = "pending";
    inquiry.timestamp = new Date();
    inquiry.save().then(
      (result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
      },
      (error) => {
        res.end(JSON.stringify({ status: "failed", data: error }));
        console.log(error);
      }
    );
  } catch (ex) {
    res.end(JSON.stringify({ status: "failed", data: ex }));
  }
});
router.get("/:id", async (req, res) => {
  try {
    let data = await Inquiry.findById(req.params.id);
    res.end(JSON.stringify({ status: "success", data: data }));
  } catch (ex) {
    res.end(JSON.stringify({ status: "failed", data: ex }));
  }
});
router.get("/:limit/:skip", async (req, res) => {
  try {
    let count = (await Inquiry.find()).length;
    let data = await Inquiry.find().limit(req.params.limit).skip(req.params.skip);
    res.end(JSON.stringify({ status: "success", count:count, data: data }));
  } catch (ex) {
    res.end(JSON.stringify({ status: "failed", data: ex }));
  }
});

router.post("/", async (req, res) => {
  try {
    var body = req.body;
    let inquiry = await Inquiry.findById(body.id);
    inquiry.feedback = body.feedback;
    inquiry.status = body.status;
    inquiry.save().then(
      (result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
      },
      (error) => {
        res.end(JSON.stringify({ status: "failed", data: error }));
      }
    );
  } catch (ex) {
    res.end(JSON.stringify({ status: "failed", data: ex }));
  }
});

module.exports = router;
