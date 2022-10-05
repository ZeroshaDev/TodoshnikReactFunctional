import * as actions from '../actions/actions'
import { handleActions } from 'redux-actions'

const token = handleActions(
  {
    [actions.setToken]: (_, payload) => payload.payload,
    [actions.clearToken]: () => '',
    [actions.clear]: () => '',
  },
  ''
)

export default token
