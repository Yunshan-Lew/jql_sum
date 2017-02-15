const loginInfo = {
	loginStatus: true
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

export default todos
