const t = new Date()
t.setTime( new Date().getTime() + 1.296E9 )

const loginIn = () => {
	document.cookie = `loginStatus=true;expires=${t};path=/;`
	return {
		type: 'LOGIN_IN'
	}
}

const loginOut = () => {
	document.cookie = `loginStatus=false;expires=${t};path=/;`
	return {
		type: 'LOGIN_OUT'
	}
}

const pullLogin = () => {
	let result = false
	let cookies = document.cookie.split(';')
	cookies.forEach(item => {
		if(item.split('=')[0].replace(/\s/g, '') === 'loginStatus'){
			result = item.split('=')[1] === 'true' ? true : false
		}
	})
	return {
		type: 'PULL_LOGIN',
		result
	}
}

export { loginIn, loginOut, pullLogin }