const outRouteHook = (callbackState, replaceState, callback) => {
	let loginStatus = false
	let cookies = document.cookie.split(';')
	cookies.forEach(item => {
		if(item.split('=')[0].replace(/\s/g, '') === 'loginStatus'){
			loginStatus = item.split('=')[1] === 'true' ? true : false
		}
	})
	
	if(loginStatus)replaceState('/user/totallist')
	
	callback()
}

export default outRouteHook