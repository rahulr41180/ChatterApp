
const User1 = require("../models/user.model");

const bcrypt = require("bcrypt");

const userLogin = async (req,res,next) => {
    try {
        const { username, password } = req.body;
        console.log('password:', password)
        console.log('username:', username)

        const user = await User1.findOne({username : username}).lean().exec();
        console.log('user:', user)

        if(!user) {
            console.log('user:', user)
            return res.status(404).json({
                message : "Incorrect Username Or Password",
                status : false,
            })
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            console.log('user:', user)
            return res.status(404).json({
                message : "Incorrect Username Or Password",
                status : false,
            })
        }
        delete user.password;

        return res.status(201).json({
            user,
            status : true,
        })
    }
    catch(error) {
        return res.status(404).json({message : error.message});
    }
}

module.exports = { userLogin }