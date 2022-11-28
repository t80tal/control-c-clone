import express from 'express'

import { apiLimiter } from '../middleware/rate-limiter.js'

import { createUrl, loginUrl, getUrl } from '../controllers/urlsController.js'

const router = express.Router()

router.route('/create').post(apiLimiter, createUrl)
router.route('/login').post(apiLimiter, loginUrl)
router.route('/:id').get(getUrl)

export default router
