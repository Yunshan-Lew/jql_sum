const getUser = (str) => {
	return {
		type: 'GET_USER',
		username: str
	}
}

export { getUser }