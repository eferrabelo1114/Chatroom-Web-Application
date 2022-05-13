import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const requestSignup = new XMLHttpRequest()

const usernameForm = {
    padding: "90px 0",
    backgroundColor: "#2341",
    textAlign: "center"
}

const submitBtn = {
    marginLeft: "5px"
}

const responseText = {
    color: "red"
}

function UsernameForm() {
    const [usernameEntered, setUsernameEntered] = useState("")
    const [response, setResponseText] = useState("")
    const navigate = useNavigate()
  
    requestSignup.onload = () => {
        let data = JSON.parse(requestSignup.response)

        if (!data.success) {
            setResponseText(data.message)
        } else {
            navigate('/home')
        }
    }

    const handleChange = (e) => {
        setUsernameEntered(e.target.value)
        e.preventDefault()
    }

    const handleSubmit = (e) => {
        requestSignup.open("POST", 'http://localhost:5000/api/user/signup', true);
        requestSignup.withCredentials = true;
        requestSignup.setRequestHeader('content-type', 'application/json')
        requestSignup.send('{"Username": "' + usernameEntered + '"}')

        e.preventDefault()
    }

    return (
        <div style={usernameForm}>
            <p>Enter a username:</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" value={usernameEntered} onChange={handleChange} />
                </label>

                <input style={submitBtn} type="submit"  value="Submit" />
            </form>
            <p style={responseText}>{response}</p>
        </div>
    )
}

export default UsernameForm