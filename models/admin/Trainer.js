var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new Schema({
    
    name: { type:String, require: true },
    email: { type:String, require: true, unique:true },
    mobileno: {type:String, required:true},
    website: {type:String, required:true},
    password: { type: String, required:true},
    status: {type:String, required:true},
    tagline: {type:String, required:true},
    gatewayid: {type:String, required:true}
    

    
});


var Trainer = mongoose.model("Trainers", schema);
module.exports =Trainer;