import {_getUsers, _getQuestions} from '../_DATA.js'
import {receiveUsers} from './users'
import {receiveQuestions} from './questions'
import {userLogin} from './authUser'

export function getUsersAndQuestions() {
  return Promise.all([
        _getUsers(),
        _getQuestions(),
      ]);
}

export function handleInitialData () {
  return (dispatch) => {
    return getUsersAndQuestions()
      .then(function (values) {
        dispatch(receiveUsers(values[0]));
        dispatch(receiveQuestions(values[1]));
        dispatch(userLogin(null))
      });
  }
}