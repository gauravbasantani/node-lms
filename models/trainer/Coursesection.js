var mongoose = require("mongoose");
var Schema = mongoose.Schema

var schema = new Schema({
    courseid: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
    name: {type: String,required: true},
    srno: {type: Number,required: true}
});
var Coursesection = mongoose.model("coursesections", schema);
module.exports = Coursesection;
