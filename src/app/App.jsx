import React, { useContext, useState } from 'react'
import MainPage from './main_page/MainPage.jsx'
import AuthoriztionPage from './authorization_page/AuthoriztionPage.jsx'
import MyContext from './MyContext.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  const context = useContext(MyContext)
  const [list, setList] = useState(false)
  const [logined, setLogined] = useState(false)

  const handleRefresh = () => {
    setList(!list)
  }

  const chengeLoginedOnTrue = () => {
    setLogined(true)
  }

  const loader = async () => {
    //context.store.log()
    await context.store.load()
    handleRefresh()
  }

  return (
    <>
      <BrowserRouter>
        {context.store.token ? (
          <Routes>
            <Route
              path="/login"
              element={
                <MyContext.Provider value={context}>
                  <AuthoriztionPage
                    loader={loader}
                    chengeLoginedOnTrue={chengeLoginedOnTrue}
                  />
                </MyContext.Provider>
              }
            />
            <Route
              path="/main"
              element={
                <MyContext.Provider value={context}>
                  {!logined ? <Navigate to="/login"></Navigate> : ''}
                  <MainPage setLogined={setLogined} />
                </MyContext.Provider>
              }
            />
            <Route path="/error" element={<div>ERROR!!!</div>} />
            {context.store.token ? (
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
                <MyContext.Provider value={context}>
                  <AuthoriztionPage
                    loader={loader}
                    chengeLoginedOnTrue={chengeLoginedOnTrue}
                  />
                </MyContext.Provider>
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
