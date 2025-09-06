import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please Provide a valid email address"]
    },

    name: {
        type: String,
        required: [true, "Please provide a name"],

    },

    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
        select: false
    }

}, {timestamps: true}
)
export const User = new mongoose.model("User", userSchema)