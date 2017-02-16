import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginIn, pullLogin } from '../../actions/actionLogin';
import { test } from '../../actions/actionTest';
import { Form, Icon, Input, Button, Layout } from 'antd';
// import reqwest from 'reqwest';

import styles from './Login.css';

const FormItem = Form.Item

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			minH: 'auto',
			user: '',
			userError: '',
			userMsg: '',
			password: '',
			passError: '',
			passMsg: ''
		}
	}
	
	checkUser(){
		if(this.state.user.length < 1){
			this.setState({ 
				userError: 'error', 
				userMsg: '请正确填写用户名' 
			})
			return false
		}
		else{
			this.setState({ 
				userError: '', 
				userMsg: '' 
			})
			return true
		}
	}
	
	checkPass(){
		if(this.state.password.length < 6){
			this.setState({ 
				passError: 'error', 
				passMsg: '请正确填写密码' 
			})
			return false
		}
		else{
			this.setState({
				passError: '',
				passMsg: ''
			})
			return true
		}
	}
	
	userChange(e){
		this.setState({ user: e.target.value })
	}
	
	passChange(e){
		this.setState({ password: e.target.value })
	}
	
	entry(){
		if( this.checkUser.bind(this)() && this.checkPass.bind(this)() ){
			this.props.loginIn() // 方式 - redux下引用actions
			location.hash = '/user/totallist'
		}
	}
	
	componentWillMount(){
		this.props.pullLogin()
		if(this.props.loginStatus)this.props.router.push({ pathname: '/user/totallist' })
	}
	
	render(){
		return (
			<Layout className={ styles['login-bg'] } style={{ minHeight: this.state.minH }}>
				<div className={ styles['login-logo'] }></div>
				<Form className={ styles['login-form'] }>
					<FormItem validateStatus={ this.state.userError } help={ this.state.userMsg }>
						<Input addonBefore={<Icon type="user" />} placeholder="用户名" value={ this.state.user } onChange={ this.userChange.bind(this) } />
					</FormItem>
					<FormItem validateStatus={ this.state.passError } help={ this.state.passMsg }>
						<Input addonBefore={<Icon type="lock" />} type="password" placeholder="登录密码" value={ this.state.password } onChange={ this.passChange.bind(this) } />
					</FormItem>
					<FormItem>
						<Button type="primary" size="large" htmlType="submit" className={ styles['login-button'] } onClick={ this.entry.bind(this) }>
							登录
						</Button>
					</FormItem>
				</Form>
				<p className={ 'font-14 text-center ' + styles['login-bt'] }>
					&copy;2014-2017 JQL.CN Technolegy Department
				</p>
			</Layout>
		)
	}
		
	componentDidMount(){
		this.setState({ minH: ( document.documentElement.clientHeight ) + 'px' })
		/*reqwest({
			url: '/',
			method: 'post',
			data: { "fuck": "you" },
			type: 'json'
		}).then((res) => {
			console.log('request succeed')
		}, (err, msg) => {
			console.log('request falied')
		})*/
		console.log(this.props.testMsg)
		this.props.test()
	}
			
}

const actions = { loginIn, pullLogin, test }

// lead stores in
const mapStateToProps = state => ({
	loginStatus: state.todos.loginStatus,
	testMsg: state.testTodos.testMsg
})

// lead actions in
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);
