import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import MessageInput from './MessageInput';
import MessageContainer from './MessageContainer';

const logoutXHR = new XMLHttpRequest();

const main = {
    position: "relative",
    height: "780px",
    backgroundColor: "#c4c7bd"
}

const messageBar = {
    position: "absolute",
    width: "100%",
    height: "30%",
    bottom: "0px",
    textAlign: "center",
    backgroundColor: "#f0f0f0"
}

const logOutButton = {
  marginTop: "10px",
  height: "40px",
  fontSize: "20px",
}

function Home() {
  const [loggedIn, setLoggedIn] = useState([{}])
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user/user", {credentials: 'include'}).then(
      response => response.json()
    ).then(
      data => {
        let isLoggedIn = JSON.parse(data).loggedIn;
        if (isLoggedIn === false)
          navigate('/login')
        setLoggedIn(isLoggedIn);
      }
    )
  }, [])

  logoutXHR.onload = () => {
    let data = JSON.parse(logoutXHR.response);
    if (JSON.parse(data).success)
      navigate('/login')
  }

  const logout = () => {
    logoutXHR.open("POST", 'http://localhost:5000/api/user/logout', true);
    logoutXHR.withCredentials = true;
    logoutXHR.setRequestHeader('content-type', 'application/json');

    logoutXHR.send('{"logoout": true}');
  }

  return (
    <div style = { main }>
      <MessageContainer />
      
      <div style = {messageBar}>
            <MessageInput />

            <button onClick={logout} style={logOutButton}>
                Log Out
            </button> 
      </div>
    </div>
  )
}

export default Home