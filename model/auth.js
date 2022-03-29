const mongoose = require('mongoose');
const validator = require('validator');

const signupSchema = new mongoose.Schema({
    firstname:{
        type: String,
        require:true
    },
    lastname:{
        type: String,
        require:true
    },
    phonenumber:{
        type: Number,
        require:true,
        unique:true,  
    },
    email:{
        type: String,
        require:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is invalid");
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true,
    },
    role:{
        type: String,
        default: 'user',
        enum:['user', 'admin']
    },
});

signupSchema.virtual("id").get(function(){
    return this._id.toHexString();
});

signupSchema.set("toJSON",{
    virtuals: true
});

module.exports = mongoose.model("Signup", signupSchema);