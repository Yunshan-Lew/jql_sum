import React, { Component } from 'react';
import { Breadcrumb, Form, Button, Modal } from 'antd'; 

const FormItem = Form.Item
const Confirm = Modal.confirm

class Message extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			loading: false
		}
	}
	
	routerWillLeave(nextLocation){
		let leave = true
		return leave
    }
	
	subSum(){
		let _self = this
		Confirm({
			title: '温馨提示',
			content: '总结提交后不能修改，确认要提交？',
			onOk(){
				_self.props.router.setRouteLeaveHook(_self.props.route, null)
				_self.props.router.push({ pathname: '/user' })
			},
			onCancel(){
			
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
							<textarea className="text-area"></textarea>
						</FormItem>
						<FormItem label="下周计划">
							<textarea className="text-area"></textarea>
						</FormItem>
						<FormItem className="text-center">
							<Button type="primary" size="large" icon="upload" loading={ this.state.loading } onClick={ this.subSum.bind(this) }>
								提交总结
							</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
		this.props.catchCurrent('2')
	}
}

export default Message
