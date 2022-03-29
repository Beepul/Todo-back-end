const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

    todotitle: {
        type: String,
        required: true
    },

    description: {
        type: String,
        require:true,
    }
});

todoSchema.virtual("id").get(function(){
    return this._id.toHexString();
});

todoSchema.set("toJSON",{
    virtuals: true
});

module.exports = mongoose.model("Todo", todoSchema);