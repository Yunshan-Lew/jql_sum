import React, { Component } from 'react';
import { Breadcrumb, Form, Button, Modal, Popover } from 'antd';

const FormItem = Form.Item
const Confirm = Modal.confirm

class Message extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			loading: false,
			leave: false,
			onTime: true,
			popverMsg: '换行不要忘了打句号哦'
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
					_self.props.router.push(nextLocation)
				},
				onCancel(){
				
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
			content: '总结提交后不能修改，确认要提交？',
			onOk(){
				_self.state.leave = true
				_self.props.router.push({ pathname: '/user' })
			}
		})
	}
	
	componentWillMount(){
		
	}
	
	render(){
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
							<Popover content={ this.state.popverMsg } title="温馨提示" trigger="focus" >
								<textarea className="text-area" disabled={ !this.state.onTime }></textarea>
							</Popover>
						</FormItem>
						<FormItem label="下周计划">
							<Popover content={ this.state.popverMsg } title="温馨提示" trigger="focus" >
								<textarea className="text-area" disabled={ !this.state.onTime }></textarea>
							</Popover>
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

export default Message
