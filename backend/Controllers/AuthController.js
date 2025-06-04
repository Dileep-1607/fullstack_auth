const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const signup = async (req, res) => {
     try{
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({email});

        if(user){
            return res.status(409).json({message: "User is already exist, you can login", success: false})
        }

        const userModel = new UserModel({
            name, email, password
        });
        userModel.password = await bcrypt.hash(password, 10);

        await userModel.save();
        res.status(201).json({
            message: "Signup successfully", 
             success: true              

        })
     }
     catch(err){
     res.status(500).json({
            message: "Internal server error,", 
            success: false              
        })
     }
}


const login = async (req, res) => {
     try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(403).json({message: "User not exist, you can signup", success: false})
        }

     const isEqualPass = await bcrypt.compare(password, user.password);
     if(!isEqualPass){
        res.status(203).json({
            message: "Wrong email or password!", 
             success: false              

        })
     }

     const jwtToken = await jwt.sign(
        {email: user.email, _id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
     )
    
     res.status(200).json({
            message: "login successfully", 
             success: true,
             jwtToken,
             email,
             name: user.name              

        })
   
     }
     catch(err){
     res.status(500).json({
            message: "Internal server error,", 
            success: false              

        })

        console.log(`This is error: ${err}`)
     }
}

module.exports = {
    signup,
    login
}