import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginIn, pullLogin, pushToken } from '../../actions/actionLogin';
import { test } from '../../actions/actionTest';
import { Form, Icon, Input, Button, Layout, message } from 'antd';
import reqwest from 'reqwest';

import styles from './Login.css';

const FormItem = Form.Item

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			minH: 'auto',
			margT: 0,
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
			<Layout className={ styles['login-bg'] } style={ { minHeight: this.state.minH } }>
				<div className={ styles['login-box'] } style={ { marginTop: this.state.margT } }>
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
						</FormItem>
					</Form>
				</div>
				<p className={ 'font-14 text-center ' + styles['login-bt'] }>
					&copy;2014-2017 JQL.CN Technolegy Department
				</p>
			</Layout>
		)
	}
		
	componentDidMount(){
		let H = document.documentElement.clientHeight
		this.setState({ 
			minH: `${ H }px`, 
			margT: `${ ( H - 360 ) / 2.2 }px`
		})
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
