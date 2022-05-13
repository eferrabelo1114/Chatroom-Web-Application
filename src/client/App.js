import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user/user", { credentials: 'include' }).then(
      response => response.json()
    ).then(
      data => {
        let isLoggedIn = JSON.parse(data).loggedIn;
        if (isLoggedIn === false)
          navigate('/login')
        else
          navigate('/home')
      }
    )
  }, [])

  return (
    <div>
      Error
    </div>
  )
}

export default App