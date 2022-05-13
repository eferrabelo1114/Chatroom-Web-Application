import express from 'express'
import user from './routes/user.mjs'
import messaging from './routes/messaging.mjs'

const router = express.Router()

router.use('/user', user)
router.use('/message', messaging)

export default router