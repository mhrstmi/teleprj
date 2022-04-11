const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    description: String,
    photo: String,
    link: String,
    scat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "scategory"

    },
    time : { type : Date, default: Date.now },
    
})

module.exports = mongoose.model("securbuy", schema)
module.exports.ProductSchema = schema;
