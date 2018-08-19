export const RECEIVE_USERS = 'RECEIVE_USERS'
export const LOGOUT = 'LOGOUT'

export function receiveUsers (users) {
  return {
	    type: RECEIVE_USERS,
	    users,
  }
}

export function logout() {
	return {
		type: LOGOUT
	}
}