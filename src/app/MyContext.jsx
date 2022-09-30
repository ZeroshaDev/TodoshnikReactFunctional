import React from 'react'
import apiCall from './ApiCall'
class Storage {
  constructor(storage) {
    this._storage = storage
    this._token = ''
  }
  clear() {
    this._storage = []
    this._token = ''
  }
  get token() {
    return this._token
  }
  set token(value) {
    this._token = value
  }
  get storage() {
    return this._storage
  }
  tokenSetter(tk) {
    this.token = tk
  }
  log() {
    console.log(this._storage)
    console.log(this._token)
  }
  add(id, content, completed) {
    this.storage.push({
      id: id,
      content: content,
      completed: completed,
    })
    apiCall(
      this.storage[this.storage.length - 1],
      '/tasks/addpost',
      'POST',
      this.token
    )
  }
  async load() {
    let posts
    await fetch(`${process.env.REACT_APP_URL}/tasks/getposts`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        posts = data
        //console.log(data)
      })

    posts.forEach((elem) => {
      this.storage.push({
        id: elem.id,
        content: elem.content,
        completed: elem.completed,
      })
    })
  }
  complete(id) {
    this.storage.forEach((elem) => {
      if (elem.id === id) {
        if (elem.completed === true) {
          elem.completed = false
          apiCall(elem, '/tasks/editpost', 'PUT', this.token)
        } else {
          elem.completed = true
          apiCall(elem, '/tasks/editpost', 'PUT', this.token)
        }
      }
    })
  }
  edit(id, content) {
    this.storage.forEach((elem) => {
      if (elem.id === id) {
        elem.content = content
        apiCall(elem, '/tasks/editpost', 'PUT', this.token)
      }
    })
  }
  delete(id) {
    this.storage.forEach((elem, i) => {
      if (elem.id === id) {
        apiCall(elem, '/tasks/deletepost', 'DELETE', this.token)
        this.storage.splice(i, 1)
      }
    })
  }
}
const MyContext = React.createContext({
  store: new Storage([], 0),
})

export default MyContext
