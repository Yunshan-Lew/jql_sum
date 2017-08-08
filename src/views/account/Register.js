import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, message, Select } from 'antd';
import reqwest from 'reqwest';

import styles from './Account.css';

const FormItem = Form.Item
const Option = Select.Option

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: '',
			userError: '',
			userMsg: '',
			job: '搬砖工',
			password: '',
			passError: '',
			passMsg: '',
			passwordRepeat: '',
			repeatError: '',
			repeatMsg: ''
		}
	}
	
	checkUser(){
		if(this.state.user.length < 5 || this.state.user.length > 15){
			this.setState({ 
				userError: 'error', 
				userMsg: '用户名长度需为5-15位' 
			})
			return false
		}
		else if( !/^[\u4E00-\u9FA5a-zA-Z]+$/.test(this.state.user) ){
			this.setState({ 
				userError: 'error', 
				userMsg: '用户名只能由汉字、字母组成' 
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
		if(this.state.password.length < 6 || this.state.password.length > 18){
			this.setState({ 
				passError: 'error', 
				passMsg: '密码长度需为6-18位' 
			})
			return false
		}
		else if( /^[0-9]+$/.test(this.state.password) ){
			this.setState({ 
				passError: 'error', 
				passMsg: '密码不能全为数字' 
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
	
	checkPassRepeat(){
		if(this.state.passwordRepeat !== this.state.password){
			this.setState({ 
				repeatError: 'error', 
				repeatMsg: '两次密码不一致' 
			})
			return false
		}
		else{
			this.setState({
				repeatError: '',
				repeatMsg: ''
			})
			return true
		}
	}
	
	register(){
		if( this.checkUser.bind(this)() && this.checkPass.bind(this)() && this.checkPassRepeat.bind(this)() ){
			reqwest({
				url: `${ this.props.THE_HOST }/register`,
				method: 'post',
				data: {
					"user": this.state.user,
					"job": this.state.job,
					"password": this.state.password
				},
				type: 'json'
			}).then( res => {
				if(res.code === "1"){
					message.success('注册成功', 1.5, () => {
						browserHistory.push({ pathname: '/login' })
					})
				}
				else{
					message.warning(res.message, 2)
				}
			}, (err, msg) => {
				message.warning('注册失败，请重试')
			})
		}
	}
	
	componentWillMount(){
		
	}
	
	render(){
		return (
			<Form className={ styles['login-form'] }>
				<FormItem validateStatus={ this.state.userError } help={ this.state.userMsg }>
					<Input addonBefore={ <Icon type="user" /> } placeholder="用户名" value={ this.state.user } onChange={ (e) => { this.setState({ user: e.target.value }) } } />
				</FormItem>
				<FormItem>
					<Select defaultValue="请选择职位" size="large" onChange={ (value) => { this.setState({ "job": value }) } }>
						<Option value="请选择职位">请选择职位</Option>
						<Option value="洗碗工">洗碗工</Option>
						<Option value="扫地工">扫地工</Option>
						<Option value="搬砖工">搬砖工</Option>
					</Select>
				</FormItem>
				<FormItem validateStatus={ this.state.passError } help={ this.state.passMsg }>
					<Input addonBefore={ <Icon type="unlock" /> } type="password" placeholder="登录密码" value={ this.state.password } onChange={ (e) => { this.setState({ password: e.target.value }) } } />
				</FormItem>
				<FormItem validateStatus={ this.state.repeatError } help={ this.state.repeatMsg }>
					<Input addonBefore={ <Icon type="lock" /> } type="password" placeholder="请重复登录密码" value={ this.state.passwordRepeat } onChange={ (e) => { this.setState({ passwordRepeat: e.target.value }) } } />
				</FormItem>
				<FormItem>
					<Button type="primary" size="large" htmlType="submit" className={ styles['login-button'] } onClick={ this.register.bind(this) }>
						注册
					</Button>
					<p className="text-right">
						已有账号，可以<Link to="/account/login">登录</Link>
					</p>
				</FormItem>
			</Form>
		)
	}
		
	componentDidMount(){
		
	}
			
}

// lead stores in
const mapStateToProps = state => ({
	THE_HOST: state.todos.THE_HOST
})

export default connect(mapStateToProps)(Register);
