import { createRequire } from "module";
import { Url } from "../models/URL.model.js";
import { User } from "../models/User.model.js";
const require = createRequire(import.meta.url);
import { createShortURL } from "../utils/createShortURL.js";

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
    return res
      .status(400)
      .json({ success: false, message: "Please provide a URL" });
  }
  const isValidURL = validURL.isWebUri(longURL);

  if (!isValidURL) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid URL format provided" });
  }

  try {
    if (!req.user) {
      const url = await Url.findOne({
        longURL,
        $or: [{ user: { $exists: false } }, { user: null }],
      });
      if (url) {
        return res
          .status(200)
          .json({ success: true, message: "Short URL Generated", data: url });
      } else {
        const newURLData = createShortURL(longURL);
        const newURL = await Url.create(newURLData);
        return res
          .status(200)
          .json({
            success: true,
            message: "Short URL Generated",
            data: newURL,
          });
      }
    }

    const user = req.user;
    const userData = await User.findOne({ _id: user._id }).populate("links");
    const isURLExists = userData.links.find((link) => link.longURL === longURL);

    if (isURLExists) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Short URL Generated",
          data: isURLExists,
        });
    }

    const newURLData = createShortURL(longURL);
    const newURL = await Url.create({ ...newURLData, user: user._id });
    userData.links.push(newURL._id);

    await userData.save();

    return res
      .status(200)
      .json({ success: true, message: "Short URL Generated", data: newURL });
  } catch (error) {
    console.log("Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "ShortenURL Internal Server Error" });
  }
};

const redirectToLongURL = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await Url.findOne({ urlCode: code });
    if (!url) {
      return res
        .status(404)
        .json({ success: false, message: "No URL Found!!" });
    }
    url.clicks++;
    await url.save();
    res.redirect(302, url.longURL);
  } catch (error) {
    console.log("Error", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { generateShortURL, redirectToLongURL };
