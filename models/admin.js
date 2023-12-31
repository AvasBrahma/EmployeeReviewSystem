const mongoose= require("mongoose");
const adminschema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    phonenumber:{
        type:String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin'],
        required: true,
      }
},{
    timestamps:true
});

const Admin=mongoose.model('Admin', adminschema);
module.exports=Admin;