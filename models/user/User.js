var mongoose = require("mongoose");
var Schema = mongoose.Schema

var schema = new Schema({
    trainerid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

var User = mongoose.model("users", schema);

module.exports = User;
