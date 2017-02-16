const loginInfo = {
	loginStatus: null
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
		
		case 'PULL_LOGIN': 
			return {
				...state,
				loginStatus: action.result
			}
			
		default:
			return state
	}
}

export default todos
