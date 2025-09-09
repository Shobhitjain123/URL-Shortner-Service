import express from 'express'
import {registerUser, login} from '../../controller/auth.contoller.js'
const router = express.Router()

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", registerUser)

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user and get a token
 * @access  Public
 */
router.post("/login", login)

export default router
