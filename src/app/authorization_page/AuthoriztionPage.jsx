import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import MyContext from '../MyContext'
import '../../index.css'

const AuthoriztionPage = (props) => {
  const storage = useContext(MyContext)
  const { loader, chengeLoginedOnTrue } = props

  const [display, setDisplay] = useState(true)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleClickLogin = async () => {
    let token
    await fetch(process.env.REACT_APP_URL + '/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: login,
        password: password,
      }),
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        token = data
      })
    storage.store.tokenSetter(token.token)
    setDisplay(false)
    loader()
    chengeLoginedOnTrue()
  }

  const handleClickRegister = async () => {
    let token
    await fetch(process.env.REACT_APP_URL + '/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: login,
        password: password,
      }),
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        token = data
      })
    storage.store.tokenSetter(token.token)
    setDisplay(false)
    loader()
    chengeLoginedOnTrue()
  }

  const inputLogin = (e) => {
    setLogin(e.target.value)
  }
  const inputPassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className={display ? 'modal' : 'hidden'}>
      {display === false ? <Navigate to="/main"></Navigate> : ''}
      <div className="modalContent">
        <h2>Please authorizate for using app!</h2>
        <div className="modalInput">
          <input
            type="text"
            placeholder="Please enter your login"
            onChange={inputLogin}
          ></input>
        </div>
        <div className="modalInput">
          <input
            type="text"
            placeholder="Please enter your password"
            onChange={inputPassword}
          ></input>
        </div>
        <div className="modalInput">
          <button className="loginBtn" onClick={handleClickLogin}>
            Login
          </button>
          <button className="loginBtn" onClick={handleClickRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthoriztionPage
