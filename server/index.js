
const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const app = express();
require("dotenv").config();
const ConnectDb = require("./config/db");
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());



const UserController = require("./src/routes/user.route");
const LoginController = require("./src/routes/login.route");
const AvatarController = require("./src/routes/avatar.route");
const allUsersController = require("./src/routes/allUser.route");
const messageController = require("./src/routes/message.route");

app.use("/register", UserController);
app.use("/login", LoginController);
app.use("/setAvatar", AvatarController);
app.use("/allUsers", allUsersController);
app.use("/sendMessage", messageController);


const server = app.listen(PORT, async () => {
    try {

        await ConnectDb();

        console.log(`listening on port ${PORT}`);

    }
    catch(error) {
        console.log({message : error.message});
    }
})

const io = socket(server, {

    cors : {
        origin : "http://localhost:3000",
        credential : true,
    }

})

// Put express as global for online users



global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user",(userId) => {
        onlineUsers.set(userId, socket.id)
    })



    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })
})