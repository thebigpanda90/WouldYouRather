export const USER_LOGIN = 'USER_LOGIN'

export function userLogin(userId) {
	return {
		type: USER_LOGIN,
		authUser: userId
	}
}