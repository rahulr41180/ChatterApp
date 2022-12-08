
const User1 = require("../models/user.model");

const Message1 = require("../models/message.model");


const addMessage = async (req,res,next) => {
    try {
        const { from, to, message } = req.body;

        const data = await Message1.create({
            message : {text : message},

            users : [from, to],
            sender : from,
        })
        if(data) {
            return res.status(201).json({
                msg : "Message added successfully."
            })
        }
        else {

            return res.status(404).json({
                msg : "Failed to add message to the database."
            })

        }
    }
    catch(error) {
        return res.status(404).json({message : error.message});
    }
}

const getMessage = async (req,res,next) => {
    try {
        const { from, to } = req.body;
        const messages = await Message1.find({
            users : {
                $all : [from, to],
            },
        }).sort({ updatedAt : 1 });

        const projectedMessages = messages.map((element) => {
            return {
                fromSelf : element.sender.toString() === from,
                message : element.message.text,
            }
        })

        return res.status(200).json(projectedMessages);
    }
    catch(error) {
        return res.status(404).json({message : error.message});
    }
}



module.exports = { addMessage, getMessage }