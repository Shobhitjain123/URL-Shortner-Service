import express from 'express'
import { generateShortURL } from '../../controller/urls.controller.js'
import auth from '../../middleware/auth.middleware.js'
const router = express.Router()

/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public
 */
router.post("/shortenURL", auth, generateShortURL)


export default router