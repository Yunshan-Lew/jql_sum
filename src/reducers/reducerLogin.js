const loginInfo = {
	loginStatus: false
}

const todos = (state = loginInfo, action) => {
	switch (action.type) {
		case 'LOGIN_OUT':
			return {
				...state,
				loginStatus: false
			}
		case 'LOGIN_IN':
			return {
				...state,
				loginStatus: true
			}
		default:
			return state
	}
}

export { loginInfo }
export default todos
