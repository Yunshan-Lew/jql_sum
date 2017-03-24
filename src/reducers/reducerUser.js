const UserInfo = {
	username: ''
}

const userTodos = (state = UserInfo, action) => {
	switch (action.type) {
		case 'GET_USER':
			return {
				...state,
				username: action.username
			}
		default:
			return state
	}
}

export default userTodos