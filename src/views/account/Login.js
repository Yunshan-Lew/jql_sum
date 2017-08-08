import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginIn, pullLogin, pushToken } from '../../actions/actionLogin';
import { test } from '../../actions/actionTest';
import { Form, Icon, Input, Button, message } from 'antd';
import reqwest from 'reqwest';

import styles from './Account.css';

const FormItem = Form.Item

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
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
		if(this.state.password.length < 1){
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
			reqwest({
				url: `${ this.props.THE_HOST }/login`,
				method: 'post',
				data: { "user": this.state.user, "password": this.state.password },
				type: 'json'
			}).then( res => {
				if(res.code === "1"){
					this.props.loginIn() // 方式 - redux下引用actions
					this.props.pushToken(res.token)
					browserHistory.push({ pathname: '/user/totallist' })
				}
				else{
					message.warning(res.message, 2)
				}
			}, (err, msg) => {
				message.warning('登录失败，请重试')
			})
		}
	}
	
	componentWillMount(){
		this.props.pullLogin()
	}
	
	render(){
		return (
			<Form className={ styles['login-form'] }>
				<FormItem validateStatus={ this.state.userError } help={ this.state.userMsg }>
					<Input addonBefore={ <Icon type="user" /> } placeholder="用户名" value={ this.state.user } onChange={ this.userChange.bind(this) } />
				</FormItem>
				<FormItem validateStatus={ this.state.passError } help={ this.state.passMsg }>
					<Input addonBefore={ <Icon type="lock" /> } type="password" placeholder="登录密码" value={ this.state.password } onChange={ this.passChange.bind(this) } />
				</FormItem>
				<FormItem>
					<Button type="primary" size="large" htmlType="submit" className={ styles['login-button'] } onClick={ this.entry.bind(this) }>
						登录
					</Button>
					<p className="text-right">
						若无账号，可以<Link to="/account/register">注册</Link>
					</p>
				</FormItem>
			</Form>
		)
	}
		
	componentDidMount(){
		this.props.test('试验-1已启动')
	}
			
}

const actions = { loginIn, pullLogin, pushToken, test }

// lead stores in
const mapStateToProps = state => ({
	THE_HOST: state.todos.THE_HOST,
	loginStatus: state.todos.loginStatus,
	testMsg: state.testTodos.testMsg
})

// lead actions in
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);
