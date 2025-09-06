import express from 'express'
import { generateShortURL } from '../../controller/urls.controller.js'
const router = express.Router()

/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public
 */
router.post("/shortenURL", generateShortURL)


export default router