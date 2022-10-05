import { combineReducers } from 'redux'

import storage from './storageReducer'
import token from './tokenReducer'

export default combineReducers({
  storage,
  token,
})
