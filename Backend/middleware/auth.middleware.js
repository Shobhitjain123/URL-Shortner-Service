import jwt from 'jsonwebtoken'
import { User } from '../models/User.model.js'
const auth = async(req, res, next) => {
    const token = req.header('x-auth-token')

    try {
        if(!token){
           return next()
        }
        
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
        
        const user = await User.findOne({_id: decodedToken.id}) 
        
        if(!user){
            return res.status(403).json({success: false, message: "User is Not Authorized"})
        }
        
        req.user = user
        
        next()
    } catch (error) {
        console.log("Error", error.message);
        return res.status(400).json({success: false, message: "Middleware error"})
    }
    
}

export default auth