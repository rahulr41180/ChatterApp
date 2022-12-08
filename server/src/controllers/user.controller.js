
const User1 = require("../models/user.model");

const bcrypt = require("bcrypt");
const GenerateToken = require("../middlewares/generateToken");

const userRegister = async (req,res,next) => {
    try {
        const { username, email, password } = req.body;
        console.log('password:', password)
        console.log('email:', email)
        console.log('username:', username)


        const usernameCheck = await User1.findOne({username : username}).lean().exec();
        console.log('usernameCheck:', usernameCheck)
        if(usernameCheck) {
            console.log('usernameCheck:', usernameCheck)
            return res.status(404).json({
                message : "This username has already used",
                status : false,
            })
        }

        const emailCheck = await User1.findOne({ email : email }).lean().exec();
        console.log('emailCheck:', emailCheck)
        if(emailCheck) {
            return res.status(404).json({
                message : "This email has already used",
                status : false,
            })
        }


        const hashPassword = await bcrypt.hash(password, 10);
        console.log('hashPassword:', hashPassword)

        const token = await GenerateToken(username)
        
        const user = await User1.create({
            username : username,
            email : email,
            password : hashPassword,
            registerToken : token,
        });
        console.log("done");

        console.log('user:', user)
        // delete user.password;
        return res.status(201).json({
            status : true,
        })
    }
    catch(error) {
        return res.status(404).json({message : error.message});
    }
}

module.exports = { userRegister }