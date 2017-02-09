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
			minH: 'auto'
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
			<Layout className={ styles['login-bg'] } style={{ minHeight: this.state.minH }}>
				<div className={ styles['login-logo'] }></div>
				<Form className={ styles['login-form'] }>
					<FormItem>
						<Input addonBefore={<Icon type="user" />} placeholder="用户名" />
					</FormItem>
					<FormItem>
						 <Input addonBefore={<Icon type="lock" />} type="password" placeholder="登录密码" />
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