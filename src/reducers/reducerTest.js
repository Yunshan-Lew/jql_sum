const testInfo = {
	testMsg: '试验-1就绪'
}

const testTodos = (state = testInfo, action) => {
	switch (action.type) {
		case 'TEST':
			return {
				...state,
				testMsg: action.testMsg
			}
		default:
			return state
	}
}

export default testTodos
