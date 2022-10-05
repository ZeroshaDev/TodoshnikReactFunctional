import * as actions from '../actions/actions'
import { handleActions } from 'redux-actions'
import { mapFromDTO } from '../utils/mapFromDTO'
import apiCall from '../ApiCall'

export const fetchTodos = async (dispatch, token) => {
  await fetch(`${process.env.REACT_APP_URL}/tasks/getposts`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      dispatch({ type: actions.load.type, payload: data })
    })
}

// export const complete = (storage,id,token,dispatch) => {
//   let newStorage=[...storage];
//   newStorage.forEach((elem) => {
//     if (elem.id === id) {
//       if (elem.completed === true) {
//         elem.completed = false
//         apiCall(elem, '/tasks/editpost', 'PUT', token)
//       } else {
//         elem.completed = true
//         apiCall(elem, '/tasks/editpost', 'PUT', token)
//       }
//     }
//   })
//   dispatch({ type: actions.complete.type, payload: newStorage });
// }

export const addTask = async (task, token, dispatch) => {
  await apiCall(task, '/tasks/addpost', 'POST', token)

  dispatch({ type: actions.add.type, payload: task })
}

export const complete = (storage, id, token, dispatch) => {
  const newStorage = [...storage].reduce((acc, post) => {
    if (post.id === id) {
      const newPost = {
        id: post.id,
        content: post.content,
        completed: !post.completed,
      }

      apiCall(newPost, '/tasks/editpost', 'PUT', token)

      return [...acc, newPost]
    }

    return [...acc, post]
  }, [])
  dispatch({ type: actions.setTasks.type, payload: newStorage })
}

export const deleteTask = (storage, id, token, dispatch) => {
  const newStorage = [...storage].reduce((acc, post) => {
    if (post.id === id) {
      apiCall(post, '/tasks/deletepost', 'DELETE', token)

      return [...acc]
    }

    return [...acc, post]
  }, [])
  dispatch({ type: actions.setTasks.type, payload: newStorage })
}

export const editTask = (storage, id, content, token, dispatch) => {
  const newStorage = [...storage].reduce((acc, post) => {
    if (post.id === id) {
      const newPost = {
        id: post.id,
        content: content,
        completed: post.completed,
      }

      apiCall(newPost, '/tasks/editpost', 'PUT', token)

      return [...acc, newPost]
    }

    return [...acc, post]
  }, [])
  dispatch({ type: actions.setTasks.type, payload: newStorage })
}

export const log = (storage, token) => {
  console.log(`Storage: ${storage}`)
  console.log(`Token: ${token}`)
}

const storage = handleActions(
  {
    [actions.add]: (state, payload) => {
      return [...state, mapFromDTO(payload.payload)]
    },
    [actions.load]: (_, payload) => {
      return payload.payload.map((post) => mapFromDTO(post))
    },
    [actions.setTasks]: (_, payload) => payload.payload,
    [actions.clear]: () => [],
    [actions.clearToken]: () => [],
  },
  []
)

export default storage
