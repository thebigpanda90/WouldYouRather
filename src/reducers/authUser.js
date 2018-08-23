import { USER_LOGIN } from '../actions/authUser'

export default function authUser (state = {}, action) {
  switch(action.type) {
    case USER_LOGIN :
      return action.authUser;      
    default :
      return null;
  }
}