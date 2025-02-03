const mongoose=require('mongoose');

const mongooseSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
}
)

const mongooseModel=new mongoose.model("Users",mongooseSchema)

module.exports=mongooseModel;