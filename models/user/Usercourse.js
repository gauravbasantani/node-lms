var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
trainerid: { type: mongoose.Schema.Types.ObjectId, ref: "trainers" },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  courseid: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

var Usercourse = mongoose.model("usercourses", schema);

module.exports = Usercourse;
