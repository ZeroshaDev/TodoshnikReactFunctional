import { configureStore } from '@reduxjs/toolkit'

import rootReducer from '../reducers/mainReducer'

export const store = configureStore({
  reducer: rootReducer,
})