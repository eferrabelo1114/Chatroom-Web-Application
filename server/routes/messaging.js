import express from 'express'
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port:8080 })
const router = express.Router()

/*
    Server Messages
    Eventually add different chatrooms and use sql, for now simple array
*/
const serverMessages = [];

router.post('/sendMessage', (req, res) => {
    serverMessages.push({"Username": req.session.username, "Message": req.body.message})

    wss.clients.forEach(client => {
        client.send(JSON.stringify(serverMessages))
    })
});

router.get('/getMessages', (req, res) => {
    res.json(serverMessages);
});

export default router