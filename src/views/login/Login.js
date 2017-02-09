import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginIn } from '../../actions/actionLogin'
import { loginInfo } from '../../reducers/reducerLogin';
import { Form, Icon, Input, Button, Layout } from 'antd';
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
			this.setState({ userError: 'error' })
			this.setState({ userMsg: '请正确填写用户名' })
			return false
		}
		else{
			this.setState({ userError: '' })
			this.setState({ userMsg: '' })
			return true
		}
	}
	
	checkPass(){
		if(this.state.password.length < 3){
			this.setState({ passError: 'error' })
			this.setState({ passMsg: '请正确填写密码' })
			return false
		}
		else{
			this.setState({ passError: '' })
			this.setState({ passMsg: '' })
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
			let { dispatch } = this.props
			dispatch(loginIn())
			location.hash = '/user/totallist'
		}
	}
	
	componentWillMount(){
		if(loginInfo.loginStatus)this.props.router.push({ pathname: '/user/totallist' })
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
	}
			
}

export default connect()(Login);