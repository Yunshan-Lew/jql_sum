import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Breadcrumb, Form, Button, Modal, message } from 'antd';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import reqwest from 'reqwest';

const FormItem = Form.Item
const Confirm = Modal.confirm

class Message extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			loading: false,
			leave: false,
			onTime: true,
			thisWeek: 'const Start = ( ) => "Let\'s write a summary!"',
			nextWeek: 'const Start = ( ) => "Let\'s write a plan!"'
		}
	}
	
	routerWillLeave(nextLocation){
		if(!this.state.leave){
			let _self = this
			Confirm({
				title: '温馨提示',
				content: '总结尚未提交，确认要离开？',
				onOk(){
					_self.state.leave = true
					browserHistory.push(nextLocation)
				},
				onCancel(){
					void(0)
				}
			})
		}
		return this.state.leave
    }
	
	notOnTime(){
		Modal.info({
			title: '温馨提示',
			content: (
				<div>
					<p>为确保完整性，每周总结只能在周五提交</p>
				</div>
			)
		})
	}
	
	subSum(){
		let _self = this
		Confirm({
			title: '温馨提示',
			content: '总结提交后可在详情页中修改，确认要提交？',
			onOk(){
				let t = new Date();
				let yearStr = String(t.getYear() + 1900)
				let monStr = t.getMonth() + 1 > 9 ? String(t.getMonth() + 1) : `0${ t.getMonth() + 1 }`
				let dateStr = t.getDate() > 9 ? String(t.getDate()) : `0${ t.getDate() }`
				
				_self.setState({ loading: true })
				
				reqwest({
					url: 'http://localhost:3337/message',
					method: 'post',
					data: {
						"token": _self.props.token, 
						"thisWeek": _self.state.thisWeek, 
						"nextWeek": _self.state.nextWeek,
						"date": `${ yearStr }-${monStr }-${dateStr }`
					},
					type: 'json'
				}).then((resp) => {
					_self.setState({ loading: false })
					
					if(resp.code === "1"){
						_self.state.leave = true
						browserHistory.push({ pathname: '/user' })
					}
					else{
						message.warning(resp.message, 2)
					}
				}, (err, msg) => {
					_self.setState({ loading: false })
					message.warning('总结提交失败，请重试')
				})
					
			}
		})
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
	
	componentWillMount(){
		
	}
	
	render(){
		const editorOps = {
            lineNumbers: true,
			cursorBlinkRate: 400,
			showCursorWhenSelecting: true,
			theme: 'monokai',
			mode: 'javascript',
			readOnly: !this.state.onTime
        }
		
		return (
			<div>
				<div className="bd-cnt">
					<Breadcrumb className="font-14">
						<Breadcrumb.Item>总结提交</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="cnt-inner">
					<Form className="sum-form">
						<FormItem label="本周总结">
							<CodeMirror value={ this.state.thisWeek } onChange={ this.updateCode.bind(this) } options={ editorOps } />
						</FormItem>
						<FormItem label="下周计划">
							<CodeMirror value={ this.state.nextWeek } onChange={ this.updateFuture.bind(this) } options={ editorOps } />
						</FormItem>
						<FormItem className="text-center">
							{
								this.state.onTime ?
								(
									<Button type="primary" size="large" icon="upload" loading={ this.state.loading } onClick={ this.subSum.bind(this) }>
										提交总结
									</Button>
								) :
								(
									<Button type="danger" size="large" icon="exclamation-circle-o">请到周五再来填写</Button>
								)
							}
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('2')
		if(new Date().getDay() !== 5){
			// 设为无效
			this.notOnTime()
			this.setState({ onTime: false })
		}
		else{
			// 设未完离开提示
			this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
		}
	}
}

// lead stores in
const mapStateToProps = state => ({
	token: state.todos.token
})

export default connect(mapStateToProps)(Message)
