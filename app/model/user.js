const mongoose = require("mongoose");
const {ProductSchema} = require("./product")

const schema = new mongoose.Schema({
    telId: Number,
    first_name: String,
    username: String,
    gender : {
        type : String,
        enum : ["male","female"],
        default : "male"
    },
    fullName : String,
    phone : String,
    email : String,
    emailPass : String,
    emailInfo : String,
    gameName : String,
    notice : String,
    

    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
    }],
    buys: [{
        products : [ProductSchema],
        status : Boolean,
        authority : String,
        ref : String,
        amount : Number
    }]
    
})

const User= mongoose.model("user", schema);

module.exports =User;

module.exports.createUser = async (userTel, saveUser = true) => {
    const user = new User({
        telId: userTel.id,
        first_name: userTel.first_name,
        username: userTel.username,
    })
    if (saveUser)
        await user.save();
    return user;
}
