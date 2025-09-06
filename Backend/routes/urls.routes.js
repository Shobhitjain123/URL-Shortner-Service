import express from 'express'

const router = express.Router()

router.get("/shortURL", generateShortURL)


export default router