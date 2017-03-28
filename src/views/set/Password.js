import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input, Breadcrumb, Button, Row, Col, Icon, message } from 'antd';
import reqwest from 'reqwest';

const FormItem = Form.Item

class Password extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			old: '',
			oldError: '', 
			oldMsg: '',
			New: '',
			NewError: '', 
			NewMsg: '',
			repeat: '',
			repeatError: '', 
			repeatMsg: '',
			loading: false
		}
	}
	
	checkOld(){
		if(this.state.old.length < 1){
			this.setState({ 
				oldError: 'error', 
				oldMsg: '请正确填写原始密码' 
			})
			return false
		}
		else{
			this.setState({ 
				oldError: '', 
				oldMsg: '' 
			})
			return true
		}
	}
	
	checkNew(){
		if(this.state.New.length === 0){
			this.setState({ 
				NewError: 'error', 
				NewMsg: '请正确填写新的密码' 
			})
			return false
		}
		else if(this.state.New.length < 6){
			this.setState({ 
				NewError: 'error', 
				NewMsg: '新密码不得低于6位' 
			})
			return false
		}
		else{
			this.setState({ 
				NewError: '', 
				NewMsg: '' 
			})
			return true
		}
	}
	
	checkRepeat(){
		if(this.state.repeat.length < 1){
			this.setState({ 
				repeatError: 'error', 
				repeatMsg: '请重复密码' 
			})
			return false
		}
		else if(this.state.repeat !== this.state.New){
			this.setState({ 
				repeatError: 'error', 
				repeatMsg: '两次输入不一致' 
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
	
	oldChange(e){
		this.setState({ old: e.target.value })
	}
	
	NewChange(e){
		this.setState({ New: e.target.value })
	}
	
	repeatChange(e){
		this.setState({ repeat: e.target.value })
	}
	
	sendNew(params){
		if( this.checkOld() && this.checkNew() && this.checkRepeat() ){
			this.setState({ loading: true })
			
			reqwest({
				url: 'http://localhost:3337/password',
				method: 'post',
				data: {
					...params
				},
				type: 'json'
			}).then( (data) => {
				this.setState({ loading: false })
				if(data.code === "1"){
					message.success('保存成功', 1.2, () => {
						browserHistory.push({ pathname: '/user/totallist' })
					})
				}
				else{
					message.warning(data.message, 1.8)
				}
			}, (err, msg) => {
				this.setState({ loading: false })
				message.warning('保存失败，请重试', 1.8)
			} )
		}
	}
	
	render() {
		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 16
			}
		}
		
		return (
			<div>
				<div className="bd-cnt">
					<Breadcrumb className="font-14">
						<Breadcrumb.Item>修改密码</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="cnt-inner">
					<Form className="set-form">
						<FormItem { ...formItemLayout } label="原始密码" validateStatus={ this.state.oldError } help={ this.state.oldMsg } >
							<Input type="text" value={ this.state.old } onChange={ this.oldChange.bind(this) } onBlur={ this.checkOld.bind(this) } />
						</FormItem>
						<FormItem { ...formItemLayout } label="新的密码" validateStatus={ this.state.NewError } help={ this.state.NewMsg } >
							<Input type="text" value={ this.state.New } onChange={ this.NewChange.bind(this) } onBlur={ this.checkNew.bind(this) } />
						</FormItem>
						<FormItem { ...formItemLayout } label="重复密码" validateStatus={ this.state.repeatError } help={ this.state.repeatMsg } >
							<Input type="text" value={ this.state.repeat } onChange={ this.repeatChange.bind(this) } onBlur={ this.checkRepeat.bind(this) } />
						</FormItem>
						<FormItem>
							<Row>
								<Col span={ 16 } offset={ 6 } >
									<Button type="primary" size="large" icon="save" loading={ this.state.loading } onClick={ 
										this.sendNew.bind(this, { 
											old: this.state.old, 
											New: this.state.New, 
											token: this.props.token
										}) 
									}>
										保 存
									</Button>
								</Col>
							</Row>
						</FormItem>
					</Form>
					<Icon type="safety" />
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('5')
	}
}

// lead stores in
const mapStateToProps = state => ({
	token: state.todos.token
})

export default connect(mapStateToProps)(Password);
