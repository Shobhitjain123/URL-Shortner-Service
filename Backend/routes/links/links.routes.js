import express from 'express'
import auth from '../../middleware/auth.middleware.js'
import {getMyLinks} from  '../../controller/links.controller.js'

const router = express.Router()

router.get("/my-links", auth, getMyLinks)

export default router