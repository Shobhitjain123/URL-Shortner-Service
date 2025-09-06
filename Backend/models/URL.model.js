import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    urlCode: {
        type: String,
        required: true
    },

    longURL: {
        type: String,
        required: true
    },

    shortURl: {
        type: String,
        required: true
    },

     clicks: {
    type: Number,
    required: true,
    default: 0,
  },
})

export const Url = new mongoose.model("Url", urlSchema)