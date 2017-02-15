const testInfo = {
	testMsg: '试验-1登陆就绪'
}

const testTodos = (state = testInfo, action) => {
	switch (action.type) {
		case 'TEST':
			return {
				...state,
				testMsg: '试验-1登陆完成'
			}
		default:
			return state
	}
}

export default testTodos
