
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        min : 3,
        max : 20
    },
    email : {
        
        type : String,
        required : true,
        unique : true,
        max : 50
    },
    password : {
        type : String,
        required : true,
        min : 8,
    },
    isAvatarImageSet : {
        type : Boolean,
        default : false,
    },
    avatarImage : {
        type : String,
        default : "",
    },
    registerToken : {

        type : String,
    },
    loginToken : {
        type : String
    }
})

const User1 = mongoose.model("user", UserSchema);

module.exports = User1;