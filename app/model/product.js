const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    photo: String,
    price: Number,
    exist: {type: Boolean, default: true},
    link: String,
    meta: [],
    cat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    time : { type : Date, default: Date.now },
})

module.exports = mongoose.model("product", schema)
module.exports.ProductSchema = schema;
