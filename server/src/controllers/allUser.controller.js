
const User1 = require("../models/user.model");

const allUsersRatherThenCurrentUser = async (req,res,next) => {
    try {
        const UserId = req.params.id;
        console.log('UserId:', UserId)

        const Users = await User1.find({_id : {$not : {$eq : UserId}}}).select([
            "email","username","_id","avatarImage"
        ]).lean().exec();
        console.log('Users:', Users)

        return res.status(200).json({

            Users,
        })
    }
    catch(error) {
        return res.status(404).json({message : error.message});
    }
}

module.exports = { allUsersRatherThenCurrentUser }