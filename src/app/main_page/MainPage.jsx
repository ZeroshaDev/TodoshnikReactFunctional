import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import Task from './task/Task'
import '../../index.css'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions/actions'
import { GetToken, GetStorage } from '../selectors/selectors'
import { addTask, fetchTodos } from '../reducers/storageReducer'

const MainPage = (props) => {
  const { setLogined } = props
  const [content, setContent] = useState('')
  //const context = useContext(MyContext)

  const dispatch = useDispatch()
  const token = useSelector(GetToken)
  const storage = useSelector(GetStorage)

  const handleClickAddBtn = () => {
    if (content !== '') {
      addTask(
        { id: uuid(), content: content, completed: false },
        token,
        dispatch
      )

      // context.store.add(uuid(), content, false)
      setContent('')
    } else {
      alert('In field mast be some information')
    }
  }

  const handleClickLogOutBtn = () => {
    setLogined(false)
    dispatch({ type: actions.clear.type })
    //context.store.clear()
    dispatch({ type: actions.clearToken.type })
  }

  const handleChange = (event) => {
    setContent(event.target.value)
  }

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleClickAddBtn()
    }
    if (event.key === 'Escape') {
      event.target.blur()
      setContent('')
    }
  }

  useEffect(() => {
    if (!token) {
      return
    }

    fetchTodos(dispatch, token)
  }, [dispatch, token])

  return (
    <div>
      <input
        type="text"
        placeholder="Input something"
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        value={content}
      />
      <button onClick={handleClickAddBtn}>Add</button>
      <button onClick={handleClickLogOutBtn}>LogOut</button>
      <ul>
        {storage.map((elem) => (
          <Task
            key={elem.id}
            id={elem.id}
            propsContent={elem.content}
            completed={elem.completed}
            storage={storage}
          />
        ))}
      </ul>
    </div>
  )
}

export default MainPage
