
const User1 = require("../models/user.model");

const bcrypt = require("bcrypt");

const userAvatar = async (req,res,next) => {
    try {
        console.log('userId:',req.body)
        const userId = req.params.id;
        console.log('userId:', userId)
        const imageAvatar = req.body.image;
        console.log('imageAvatar:', imageAvatar)
        
        const User = await User1.findByIdAndUpdate(userId, {isAvatarImageSet : true, avatarImage : imageAvatar}, {new : true})
        console.log('User:', User)

        
        return res.status(202).json({
            isSet : User.isAvatarImageSet, 
            image : User.avatarImage
        })
    }
    catch(error) {
        return res.status(404).json({message : error.message});
    }
}

module.exports = { userAvatar }