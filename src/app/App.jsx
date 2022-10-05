import React, { useEffect, useState } from 'react'
import MainPage from './main_page/MainPage.jsx'
import AuthoriztionPage from './authorization_page/AuthoriztionPage.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { fetchTodos } from './reducers/storageReducer'
import { useDispatch, useSelector } from 'react-redux'
import { GetToken } from './selectors/selectors'

const App = () => {
  //const context = useContext(MyContext)
  const dispatch = useDispatch()
  const token = useSelector(GetToken)
  //const storage = useSelector(GetStorage)

  // const [list, setList] = useState(false)
  const [logined, setLogined] = useState(false)

  // const handleRefresh = useCallback(() => {
  //   setList(!list)
  // }, [list])

  const chengeLoginedOnTrue = () => {
    setLogined(true)
  }

  // const loader = useCallback(async () => {
  //   //context.store.log()
  //   await fetchTodos(dispatch, token)
  //   //await context.store.load()
  //   log(storage, token)
  //   handleRefresh()
  // }, [token, dispatch, storage, handleRefresh])

  useEffect(() => {
    if (!token) {
      return
    }

    fetchTodos(dispatch, token)
  }, [dispatch, token])

  return (
    <>
      <BrowserRouter>
        {token ? (
          <Routes>
            <Route
              path="/login"
              element={
                //<MyContext.Provider value={context}>
                <AuthoriztionPage
                  // loader={loader}
                  chengeLoginedOnTrue={chengeLoginedOnTrue}
                />
                //</MyContext.Provider>
              }
            />
            <Route
              path="/main"
              element={
                //<MyContext.Provider value={context}>
                <>
                  {!logined ? <Navigate to="/login"></Navigate> : ''}
                  <MainPage setLogined={setLogined} />
                </>

                //</Routes></MyContext.Provider>
              }
            />
            <Route path="/error" element={<div>ERROR!!!</div>} />
            {token ? (
              ''
            ) : (
              <Route path="*" element={<Navigate to="/login"></Navigate>} />
            )}
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                //<MyContext.Provider value={context}>
                <AuthoriztionPage
                  // loader={loader}
                  chengeLoginedOnTrue={chengeLoginedOnTrue}
                />
                //</MyContext.Provider>
              }
            />
            <Route path="*" element={<Navigate to="/login"></Navigate>} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  )
}

export default App
