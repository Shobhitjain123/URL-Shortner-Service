import mongoose from 'mongoose'

const dbConnect = async() => {
    try {
     const db = await mongoose.connect(process.env.MONGODB_URI)
     console.log("MongoDB Database Connection Successfull", db.connection.host);
     
    } catch (error) {
        console.log("Error in DB Connection", error.message); 
        process.exit(1)  
    }
}

export default dbConnect