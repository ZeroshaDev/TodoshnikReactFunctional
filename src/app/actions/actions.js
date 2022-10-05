import { createAction } from '@reduxjs/toolkit'

export const setToken = createAction('SET_TOKEN')
export const clearToken = createAction('CLEAR_TOKEN')

export const add = createAction('ADD_STORAGE')
export const clear = createAction('CLEAR_STORAGE')
export const load = createAction('LOAD_STORAGE')
export const setTasks = createAction('SET_STORAGE')
