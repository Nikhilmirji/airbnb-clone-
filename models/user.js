// const { string, required } = require("joi");
const mongoose=require("mongoose");
const schema=mongoose.Schema
const passportlocal=require("passport-local-mongoose")
const userschema=new schema({
    email:{
        type:String,
        required:true
    },

})

userschema.plugin(passportlocal)
module.exports=mongoose.model("user",userschema);