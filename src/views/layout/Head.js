import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Button, Dropdown, Layout, Menu, Icon } from 'antd';
import { loginOut } from '../../actions/actionLogin';
const { Header } = Layout;

class Head extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}
	
	exit(){
		let { dispatch } = this.props
		dispatch(loginOut()) // 方式 - 直接引用actions
		location.hash = '/login'
	}
	
	render(){
		const menu = (
			<Menu>
				<Menu.Item key="1">
					<Link to="/user/message">
						<Icon type="edit" /> 提交总结
					</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<a onClick={ this.exit.bind(this) }>
						<Icon type="logout" /> 退出
					</a>
				</Menu.Item>
			</Menu>
		);
		
		return (
			<Header className="jql-head">
				<Link to="/user/totallist" className="jql-logo pull-left"></Link>
				<div className="slogan pull-left"></div>
				<div className="pull-right head-btn">
					<Dropdown overlay={ menu }>
						<Button>
							<Icon type="user" />
							用户名
							<Icon type="down" />
						</Button>
					</Dropdown>
				</div>
			</Header>
		)
	}
}

export default connect()(Head);