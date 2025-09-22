import {Url} from '../models/URL.model.js'

const getMyLinks = async(req, res) => {

    if(!req.user){
        return res.status(401).json({success: false, message: "User is not Authorized"})
    }

    const user = req.user
    
   try {
     const listOfURL = await Url.find({user: user._id})
            
     if(!listOfURL){
         return res.status(404).json({success: false, message: "No List found"})
        }
        res.status(200).json({success: true, message: `List of all URL for user ${user.email}`, data: listOfURL})

    } catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({success: false, message: "Internal Server Error"})
   }

}

export {
    getMyLinks
}