import express from 'express'
import user from './routes/user.js'
import messaging from './routes/messaging.js'

const router = express.Router()

router.use('/user', user)
router.use('/message', messaging)

export default router