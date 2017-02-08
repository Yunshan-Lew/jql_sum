import React, { Component } from 'react';
import { Breadcrumb, Form, Button } from 'antd'; 

const FormItem = Form.Item

class Message extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			loading: false
		}
	}
	
	routerWillLeave(nextLocation){
		const leave = confirm('总结尚未提交，确认要离开本页面？')
		return leave
    }
	
	subSum(){
		this.props.router.setRouteLeaveHook(this.props.route, null)
		this.props.router.push({ pathname: '/user' })
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
							<Button type="primary" icon="upload" loading={ this.state.loading } onClick={ this.subSum.bind(this) }>
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
