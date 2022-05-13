import express from 'express'
import cors from 'cors'
import cookieSession from 'cookie-session'
import Keygrip from 'keygrip'
import router from './routes.js'

const app = express();
const corsOptions = { origin: 'http://192.168.1.20:3000', credentials: true }

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieSession({ name: 'session', keys: new Keygrip(['key1', 'key2'], 'SHA384', 'base64'), maxAge: 24 * 60 * 60 * 1000 }))
app.use('/api', router)

app.listen(5000, () => console.log("Server started on port 5000"))