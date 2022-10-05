import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import * as actions from '../actions/actions'
import '../../index.css'
import { log } from '../reducers/storageReducer'
import { GetStorage, GetToken } from '../selectors/selectors'

const AuthoriztionPage = (props) => {
  //const storage = useContext(MyContext)
  const tokend = useSelector(GetToken)
  const storage = useSelector(GetStorage)

  const { chengeLoginedOnTrue } = props

  const [display, setDisplay] = useState(true)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

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
    dispatch({ type: actions.setToken.type, payload: token.token })
    log(storage, tokend)
    setDisplay(false)
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
    dispatch({ type: actions.setToken.type, payload: token.token })
    setDisplay(false)
    // loader()
    chengeLoginedOnTrue()
  }

  const inputLogin = (e) => {
    setLogin(e.target.value)
  }
  const inputPassword = (e) => {
    setPassword(e.target.value)
  }

  // const handleInclement = useCallback(() => {
  //   dispatch({ type: actions.incrementCounter.type, payload: 1 })
  // }, [dispatch])

  // const handleDevrement = useCallback(() => {
  //   dispatch({ type: actions.decrementCounter.type, payload: 1 })
  // }, [dispatch])

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
