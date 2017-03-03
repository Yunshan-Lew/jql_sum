import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Breadcrumb, Button, Card, Col, Row, message } from 'antd';
import reqwest from 'reqwest';

class Summary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			thisWeek: '',
			nextWeek: ''
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
								<p dangerouslySetInnerHTML={{ __html: this.state.thisWeek }}></p>
							</Card>
						</Col>
						<Col span="12">
							<Card title={ `${ this.state.username }的下周计划` }>
								<p dangerouslySetInnerHTML={{ __html: this.state.nextWeek }}></p>
							</Card>
						</Col>
					</Row>
					<div className="text-center mart-60">
						<Link to={ "/user/inside/" + this.props.params.date }>
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
					thisWeek: data.thisWeek.replace(/\n/g, '<br/>'),
					nextWeek: data.nextWeek.replace(/\n/g, '<br/>')
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
		
	}
}

export default Summary;