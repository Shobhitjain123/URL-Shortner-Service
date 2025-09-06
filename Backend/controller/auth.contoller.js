import {User} from '../models/User.model.js'
import bcrypt from 'bcryptjs'
/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */

const registerUser = async(req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({success: false, message: "All Fields are required"})
    }

   try {
     const existingUser = await User.findOne({email})
     console.log("My Code is here");
     console.log("Existing user value", existingUser);
     
     if(existingUser){
         console.log("My Code is here2");
         return res.status(400).json({success: false, message: "User already exists"})
     }
     
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)
 
     const newUser = await User.create({
         name,
         email,
         password: hashedPassword
     })
 
     if(!newUser){
       return res.status(400).json({success: false, message: "Error Creating new User"})
     }
 
     res.status(201).json({success: true, message: "User Registred Successfully", data: {id: newUser._id, name: newUser.name, email: newUser.email}})
     
   } catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({success: false, message: "Internal server error"})
        
   }
}

const login = async() => {

}

export {
    registerUser,
    login
}
