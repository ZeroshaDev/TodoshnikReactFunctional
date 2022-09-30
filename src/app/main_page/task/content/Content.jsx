import React, { useState } from 'react'
import '../../../../index.css'

const Content = (props) => {
  const {
    contentSetter,
    editOnClick,
    nowOnChangeSetter,
    nowOnChange,
    completed,
    propsContent,
  } = props

  const [content, setContent] = useState(propsContent)

  const handleOnKeyUp = (e) => {
    const { value } = e.target

    contentSetter(value)
    setContent(value)
    if (e.key === 'Enter') {
      contentSetter(value)
      setContent(value)
      editOnClick()
    }
    if (e.key === 'Escape') {
      setContent(propsContent)
      nowOnChangeSetter()
    }
  }
  return (
    <div>
      {!nowOnChange ? (
        <div
          className={completed ? 'content done' : 'content '}
          onClick={editOnClick}
        >
          {content}
        </div>
      ) : (
        <input
          type="text"
          defaultValue={content}
          onKeyUp={handleOnKeyUp}
        ></input>
      )}
    </div>
  )
}

export default Content
