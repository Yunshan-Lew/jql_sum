import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Breadcrumb, Button, Card, Col, Row, message, Form, Modal } from 'antd';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import reqwest from 'reqwest';

const FormItem = Form.Item

class Summary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			the_user: '',
			
			username: '',
			thisWeek: '',
			nextWeek: '',
			
			modalV: false
		}
	}
	
	subChange(){
		let _self = this
		let d = _self.props.params.date
		
		reqwest({
			url: "http://localhost:3337/edit",
			method: 'post',
			data: {
				"thisWeek": _self.state.thisWeek,
				"nextWeek": _self.state.nextWeek,
				"token": _self.props.token,
				"date": `${ d.slice(0, 4) }-${ d.slice(4, 6) }-${ d.slice(6) }`
			},
			type: 'json'
		}).then( (res) => {
			if(res.code === "1"){
				message.success('修改成功', 1.2, () => {
					_self.setState({
						modalV: false
					})
				})
			}
			else {
				message.warning(res.message, 1.8)
			}
		}, (err, msg) => {
			message.warning('修改失败，请重试', 1.8)
		} )
	}
	
	updateCode(txt){
        this.setState({
            thisWeek: txt
        })
    }
	
	updateFuture(txt){
		this.setState({
			nextWeek: txt
		})
	}
	
	render(){
		const editorOps = {
            lineNumbers: true,
			cursorBlinkRate: 400,
			showCursorWhenSelecting: true,
			theme: 'monokai',
			mode: 'javascript'
        }
		
		return (
			<div>
				<div className="bd-cnt">
					<Breadcrumb className="font-14">
						<Breadcrumb.Item>
							<Link to="/user/totallist">总结汇总</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<Link to={ "/user/inside/" + this.props.params.date }>总结人列表</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							总结详情
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="cnt-inner">
					<Row gutter={ 40 }>
						<Col span="12">
							<Card title={ `${ this.state.username }的本周总结` }>
								{
									this.state.thisWeek.split('\n').map( (item, index) => (
										<p key={ index } >{ item }</p>
									) )
								}
							</Card>
						</Col>
						<Col span="12">
							<Card title={ `${ this.state.username }的下周计划` }>
								{
									this.state.nextWeek.split('\n').map( (item, index) => (
										<p key={ index } >{ item }</p>
									) )
								}
							</Card>
						</Col>
					</Row>
					<div className="text-center mart-60">
						<Link to={ "/user/inside/" + this.props.params.date }>
							<Button type="primary" size="large" icon="rollback" className="btn-sum">
								返回
							</Button>
						</Link>
						{
							this.state.username === this.state.the_user ?
							(
								<Button size="large" icon="edit" className="btn-sum" onClick={
									() => {
										this.setState({
											modalV: true
										}) 
									}
								} >
									修改
								</Button>
							):
							void(0)
						}
					</div>
				</div>
				<Modal title="修改总结" width={ 800 } visible={ this.state.modalV } onOk={ this.subChange.bind(this) } onCancel={ 
					() => {
						this.setState({
							modalV: false
						}) 
					}
				} >
					<Form className="sum-form short">
						<FormItem label="本周总结">
							<CodeMirror value={ this.state.thisWeek } onChange={ this.updateCode.bind(this) } options={ editorOps } />
						</FormItem>
						<FormItem label="下周计划">
							<CodeMirror value={ this.state.nextWeek } onChange={ this.updateFuture.bind(this) } options={ editorOps } />
						</FormItem>
					</Form>
				</Modal>
			</div>
		)
	}
	
	componentDidMount(){
		let _self = this
		this.props.catchCurrent('1')
		
		reqwest({
			url: "http://localhost:3337/detail",
			method: 'post',
			data: {
				"dateNumber": this.props.params.date,
				"_id": this.props.location.query._id
			},
			type: 'json'
		}).then((data) => {
			if(data.code === "1"){
				_self.setState({
					username: data.username,
					thisWeek: data.thisWeek,
					nextWeek: data.nextWeek
				})
			}
			else{
				message.warning(data.message, 2, () => {
					browserHistory.go(-1)
				})
			}
		}, (err, msg) => {
			message.warning('获取详情失败，请重试', 2)
		})
		
		reqwest({
			url: 'http://localhost:3337/username',
			method: 'post',
			data: { "token": _self.props.token },
			type: 'json'
		}).then((res) => {
			if(res.code === "1"){
				_self.setState({ the_user: res.username })
			}
			else{
				console.log(res.message)
			}
		}, (err, msg) => {
			console.log("请求失败，请重试")
		})
		
	}
}

// lead stores in
const mapStateToProps = state => ({
	token: state.todos.token
})

export default connect(mapStateToProps)(Summary);