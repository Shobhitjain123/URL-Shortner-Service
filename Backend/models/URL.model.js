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

    shortURL: {
        type: String,
        required: true
    },

    clicks: {
    type: Number,
    required: true,
    default: 0,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },

})

// 🔹 Index to speed up lookups by longURL
urlSchema.index({ longURL: 1 });

export const Url = new mongoose.model("Url", urlSchema)