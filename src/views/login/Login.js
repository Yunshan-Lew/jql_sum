import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginIn } from '../../actions/actionLogin'
import { loginInfo } from '../../reducers/reducerLogin';
import { Form, Icon, Input, Button } from 'antd';
import styles from './Login.css';

const FormItem = Form.Item

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}
	
	entry(){
		let { dispatch } = this.props
		dispatch(loginIn())
		location.hash = '/user/totallist'
	}
	
	componentWillMount(){
		if(loginInfo.loginStatus)this.props.router.push({ pathname: '/user/totallist' })
	}
	
	render(){
		return (
			<div className="bg-fff">
				<div className={ styles['login-logo'] }></div>
				<Form className={ styles['login-form'] }>
					<FormItem>
						<Input addonBefore={<Icon type="user" />} placeholder="用户名" />
					</FormItem>
					<FormItem>
						 <Input addonBefore={<Icon type="lock" />} type="password" placeholder="登录密码" />
					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit" className={ styles['login-button'] } onClick={ this.entry.bind(this) }>
							登录
						</Button>
					</FormItem>
				</Form>
			</div>
		)
	}	
			
}

export default connect()(Login);