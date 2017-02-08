import React, { Component } from 'react';
import { Link } from 'react-router';
import { Breadcrumb, Button, Card, Col, Row } from 'antd';

class Summary extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			
		}
	}
	
	render(){
		return (
			<div>
				<div className="bd-cnt">
					<Breadcrumb className="font-14">
						<Breadcrumb.Item>
							<Link to="/user/totallist">总结汇总</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<Link to="/user/inside">总结人列表</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							总结详情
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="cnt-inner">
					<Row gutter={40}>
						<Col span="12">
							<Card title="Alice的本周总结">
								本周已完成内容。。。
							</Card>
						</Col>
						<Col span="12">
							<Card title="Alice的下周计划">
								下周要完成内容。。。
							</Card>
						</Col>
					</Row>
					<div className="text-center mart-30">
						<Link to="/user/inside">
							<Button type="primary" size="large" icon="rollback">
								返回
							</Button>
						</Link>
					</div>
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('1')
	}
}

export default Summary;