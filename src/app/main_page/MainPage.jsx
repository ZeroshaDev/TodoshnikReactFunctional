import React, { useContext, useState } from 'react'
import MyContext from '../MyContext'
import uuid from 'react-uuid'
import Task from './task/Task'
import '../../index.css'

const MainPage = (props) => {
  const { setLogined } = props
  const [list, setList] = useState(false)
  const [content, setContent] = useState('')
  const context = useContext(MyContext)

  const handleRefresh = () => {
    setList(!list)
  }

  const handleClickAddBtn = () => {
    if (content !== '') {
      context.store.add(uuid(), content, false)
      setContent('')
      handleRefresh()
    } else {
      alert('In field mast be some information')
    }
  }

  const handleClickLogOutBtn = () => {
    setLogined(false)
    context.store.clear()
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
        {context.store.storage.map((elem) => (
          <Task
            key={elem.id}
            id={elem.id}
            propsContent={elem.content}
            completed={elem.completed}
            storage={context.store}
            refresh={handleRefresh}
          />
        ))}
      </ul>
    </div>
  )
}

export default MainPage
