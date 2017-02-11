const testInfo = {
	testMsg: '试验-1登陆就绪'
}

const testTodos = (state = testInfo, action) => {
	switch (action.type) {
		case 'TEST':
			{
				testInfo.testMsg = '试验-1登陆完成'
				return state
			}
		default:
			return state
	}
}

export { testInfo }
export default testTodos
