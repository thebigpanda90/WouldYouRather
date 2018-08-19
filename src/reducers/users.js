import { RECEIVE_USERS, LOGOUT } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case LOGOUT:
    	return null;
    default :
      return state
  }
}