const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    phonenumber:{
        type: String,
        require:true,
    },
    message:{
        type: String,
        require:true,
    }
});

aboutSchema.virtual("id").get(function(){
    return this._id.toHexString();
});

aboutSchema.set("toJSON",{
    virtuals: true
});

module.exports = mongoose.model("Contact", contactSchema);