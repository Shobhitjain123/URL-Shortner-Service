import express from 'express'
import {redirectToLongURL} from '../../controller/urls.controller.js'
const router = express.Router()

router.get("/:code", redirectToLongURL)

export default router