import cookies from 'browser-cookies'

const loginIn = () => {
	cookies.set('loginStatus', 'true', {
		expires: 7,
		path: '/'
	})
	return {
		type: 'LOGIN_IN'
	}
}

const loginOut = () => {
	cookies.set('loginStatus', 'false', {
		expires: 7,
		path: '/'
	})
	return {
		type: 'LOGIN_OUT'
	}
}

const pullLogin = () => {
	let result = cookies.get('loginStatus') === 'true' ? true : false
	return {
		type: 'PULL_LOGIN',
		result
	}
}

const pullToken = () => {
	let token = cookies.get('token')
	return {
		type: 'PULL_TOKEN',
		token
	}
}

const pushToken = (str) => {
	cookies.set('token', str, {
		expires: 7,
		path: '/'
	})
	return {
		type: 'PUSH_TOKEN',
		token: str
	}
}

export { loginIn, loginOut, pullLogin, pullToken, pushToken }