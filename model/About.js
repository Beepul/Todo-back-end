const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({

    abouttitle: {
        type: String,
        required: true
    },

    aboutdescription: {
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

module.exports = mongoose.model("About", aboutSchema);