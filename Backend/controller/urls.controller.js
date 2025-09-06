import { createRequire } from "module";
import { Url } from "../models/URL.model.js";
import { nanoid } from "nanoid";
const require = createRequire(import.meta.url);

const validURL = require("valid-url");

/**
 * @desc    This function will be responsible for creating a new short URL.
 *          It will handle the business logic of validating the long URL,
 *          checking for its existence, generating a short code, and saving
 *          it to the database.
 * @route   POST /api/v1/urls/shortURL
 * @access  Public
 */
const generateShortURL = async (req, res) => {
  
  const { longURL } = req.body;

  if (!longURL) {
    return res.status(400).json({ message: "Please provide a URL" });
  }
  const isValidURL = validURL.isWebUri(longURL);

  if (!isValidURL) {
    return res.status(400).json({ message: "Invalid URL format provided" });
  }


  try {
    const url = await Url.findOne({ longURL });
   
    
    if (url) {
      
      url.clicks++;
      await url.save();
      return res.status(200).json({ success: true, message: "Short URL Generated", data: url });
    }
 
    
    const urlCode = nanoid(7);

    if (!urlCode) {
      return res.status(400).json({ success: false, message: "Error Creating unique urlCode" });
    }

    const shortURL = `${process.env.BASE_URL}/${urlCode}`;

    const newURLData = await Url.create({
      longURL,
      shortURL,
      urlCode,
    });

    if (!newURLData) {
      return res.status(400).json({ success: true, message: "Error Creating New URL" });
    }

    res.status(201).json({
        success: true,
        message: "Short URL Generated",
        data: newURLData,
      });

  } catch (error) {
    console.log("Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { generateShortURL };
