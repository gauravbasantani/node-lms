var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new Schema(
    {
        name:{type:String,require:true},
        email:{type:String,require:true},
        mobileno:{type:String,require:true},
        message:{type:String,require:true},
        feedback:{type:String},
        status:{type:String,require:true},
        timestamp:{type:Date,require:true}
    }
);
var Inquiry= mongoose.model("inquiries",schema);

module.exports=Inquiry;
