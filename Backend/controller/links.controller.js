import {User} from '../models/User.model.js'
import {Url} from '../models/URL.model.js'

const getMyLinks = async(req, res) => {

    if(!req.user){
        return res.status(401).json({success: false, message: "User is not Authorized"})
    }
    await Url.syncIndexes();

    const user = req.user
    
   try {
    
    const userWithLinks = await User.findOne({_id: user._id})
    
    if(userWithLinks.links.length === 0 ){
        return res.status(404).json({success: false, message: "No List found"})
    }

    const urls = await Promise.all(userWithLinks.links.map(async (link) => {
        const url = await Url.findById({_id: link._id})
        return url
    }))
    
    res.status(200).json({success: true, message: "All URLs List", data: urls})


    } catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({success: false, message: "Internal Server Error"})
   }

}

export {
    getMyLinks
}