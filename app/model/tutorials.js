const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    description: String,
    photo: String,
    link: String,
    tcat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tcategory"
        
    },
    time : { type: Date, default: Date.now },
    
})

module.exports = mongoose.model("tutorials", schema)
module.exports.ProductSchema = schema;
