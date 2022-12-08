
const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    message : {
        text : {
            type : String,
            required : true,
        },
    },
    users : Array,
    sender : {
        
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
}, {
    timestamps : true,
})

const Message1 = mongoose.model("message", MessageSchema);

module.exports = Message1;