const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    description: String,
    photo: String,
    link: String,
    qcat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "qcategory"
    },
    time : { type : Date, default: Date.now },
    
})

module.exports = mongoose.model("questions", schema)
module.exports.ProductSchema = schema;
