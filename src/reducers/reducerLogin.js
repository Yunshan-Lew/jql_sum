const loginInfo = {
	loginStatus: true
}

const todos = (state = loginInfo, action) => {
	switch (action.type) {
		case 'LOGIN_OUT':
			{
				loginInfo.loginStatus = false
				return state
			}
		case 'LOGIN_IN':
			{
				loginInfo.loginStatus = true
				return state
			}
		default:
			return state
	}
}

export { loginInfo }
export default todos
