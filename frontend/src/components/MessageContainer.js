import React, { useEffect, useState, useRef } from 'react'

const ws = new WebSocket('ws://192.168.1.20:8080');

const messageBox = {
    position: "relative",
    backgroundColor: "#c4c7bd",
    height: "100%",
    fontSize: "20px",
    overflowY: "scroll"
}

const messageContainer = {
    paddingLeft: "10px",
    height: "70%"
  }

const refsty = {
    height: "0%"
}

const message = {
    bottom: "0px"
}

function MessageContainer() {
    const [messages, setMessages] = useState([])
    const bottomDiv = useRef(null)

    const scrollToBottom = () => {
        if (bottomDiv.current != null)
            bottomDiv.current.scrollIntoView();
    }

    const renderMessages = () => {
        if (typeof messages === 'undefined')
            return <p>Loading...</p>
    
        if (messages.length === 0)
            return <p>No Messages</p>
    
        return messages.map((element, i) => (
            <p style = { message } key={ i }> { element.Username }: { element.Message } </p>
        ))
    }

    ws.addEventListener('message', function(event) {
        setMessages(JSON.parse(event.data))
    })

    useEffect(() => {
        if (messages.length <= 0) {
            fetch("/api/message/getMessages").then(
                response => response.json()
                ).then(
                data => {
                    setMessages(data)
                }
            )
        }

        scrollToBottom()
    })

    return (
        <div style = {messageContainer}>
            <div style = {messageBox}>
                { renderMessages(messages) }
                <div ref={bottomDiv} style={ refsty } />
            </div>
        </div>
    )
}

export default MessageContainer