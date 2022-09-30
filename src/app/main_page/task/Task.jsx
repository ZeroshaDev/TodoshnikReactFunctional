import React, { useState } from 'react'
import Content from './content/Content'
import '../../../index.css'

const Task = (props) => {
  const { storage, refresh, id, completed, propsContent } = props

  const [nowOnChange, setNowOnChange] = useState(false)
  const [content, setContent] = useState('')

  const deleteOnClic = () => {
    storage.delete(id)
    refresh()
  }
  const doneOnClick = () => {
    storage.complete(id)
    refresh()
  }
  const editOnClick = () => {
    if (nowOnChange) {
      storage.edit(id, content)
    }
    setNowOnChange(!nowOnChange)
    refresh()
  }

  const contentSetter = (updatedContent) => {
    setContent(updatedContent)
  }

  const nowOnChangeSetter = () => {
    setNowOnChange(false)
  }
  return (
    <li>
      <button onClick={doneOnClick} className="doneBtn">
        {completed ? 'Uncomplete' : 'Complete'}
      </button>
      <Content
        completed={completed}
        propsContent={propsContent}
        nowOnChange={nowOnChange}
        editOnClick={editOnClick}
        contentSetter={contentSetter}
        nowOnChangeSetter={nowOnChangeSetter}
      />
      <button onClick={editOnClick} disabled={completed}>
        {!nowOnChange ? 'Edit' : 'Save'}
      </button>
      <button onClick={deleteOnClic}>Delete</button>
    </li>
  )
}

export default Task
