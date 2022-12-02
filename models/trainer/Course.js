var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    trainerid: { type: mongoose.Schema.Types.ObjectId, ref: "trainers" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imagepath: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    timestamp: { type: Date, required: true },
});
var Course = mongoose.model("courses", schema);
module.exports = Course;