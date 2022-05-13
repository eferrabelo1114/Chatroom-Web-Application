import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import UsernameForm from './UsernameForm'

function Login() {
  let navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user/user", { credentials: 'include' }).then(
      response => response.json()
    ).then(
      data => {
        let isLoggedIn = JSON.parse(data).loggedIn;
        if (isLoggedIn === true)
          navigate('/home')
      }
    )
  })

  return (
    <div>
      <UsernameForm />
    </div>
  )
}

export default Login