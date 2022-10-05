import React, { useState } from 'react'
import Content from './content/Content'
import '../../../index.css'
import { useSelector, useDispatch } from 'react-redux'
import { GetStorage, GetToken } from '../../selectors/selectors'
import { complete, deleteTask, editTask } from '../../reducers/storageReducer'

const Task = (props) => {
  const { id, completed, propsContent } = props

  const dispatch = useDispatch()
  const token = useSelector(GetToken)
  const storage = useSelector(GetStorage)

  const [nowOnChange, setNowOnChange] = useState(false)
  const [content, setContent] = useState('')

  const deleteOnClic = () => {
    deleteTask(storage, id, token, dispatch)
    //storage.delete(id)
  }
  const doneOnClick = () => {
    complete(storage, id, token, dispatch)
    //storage.complete(id)
  }
  const editOnClick = () => {
    if (nowOnChange) {
      editTask(storage, id, content, token, dispatch)
      //storage.edit(id, content)
    }
    setNowOnChange(!nowOnChange)
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
