const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    time : { type : Date, default: Date.now },
    
})

module.exports = mongoose.model("notes", schema)
