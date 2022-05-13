import React, { useState } from 'react'

const sendMessage = new XMLHttpRequest();  

const submitButton = {
    marginTop: "10px",
    height: "40px",
    fontSize: "20px",
}

const textInput = {
    width: "70%",
    fontSize: "20px",
}

const enterText = {
    height: "10px",
    fontSize: "20px",
}

function MessageInput() {
    const [message, setMessage] = useState("")

    const handleSubmit = () => {
        sendMessage.open("POST", 'http://localhost:5000/api/message/sendMessage', true);
        sendMessage.withCredentials = true;
        sendMessage.setRequestHeader('content-type', 'application/json')

        sendMessage.send('{"message": "' + message + '"}')
        setMessage("")
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter')
            handleSubmit()
    }

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div>
            <p style = { enterText }>Enter a message:</p>
            <div>
                <div>
                    <input style = {textInput} type="text" value={message} onChange={handleMessage} onKeyPress = {handleKeyPress} />
                </div>
                <input type="submit" style={submitButton} onClick={ handleSubmit } value="Send Message" />
            </div>
        </div>
    )

}

export default MessageInput

