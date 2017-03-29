import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button, Dropdown, Layout, Menu, Icon } from 'antd';
import { loginOut } from '../../actions/actionLogin';
import { getUser } from '../../actions/actionUser';
import reqwest from 'reqwest';

const { Header } = Layout;

class Head extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "用户名"
		}
	}
	
	exit(){
		let { dispatch } = this.props
		dispatch(loginOut()) // 方式 - 直接引用actions
		this.props.routerPush({ pathname: '/login' })
	}
	
	render(){
		const menu = (
			<Menu>
				<Menu.Item key="1">
					<Link to="/user/message">
						<Icon type="edit" /> 总结提交
					</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to="/user/sharesubmit">
						<Icon type="share-alt" /> 发布分享
					</Link>
				</Menu.Item>
				<Menu.Item key="3">
					<a onClick={ this.exit.bind(this) }>
						<Icon type="logout" /> 退出
					</a>
				</Menu.Item>
			</Menu>
		)
		
		return (
			<Header className="jql-head">
				<Link to="/user/totallist" className="jql-logo pull-left"></Link>
				<div className="slogan pull-left"></div>
				<div className="pull-right head-btn">
					<Dropdown overlay={ menu }>
						<Button>
							<Icon type="user" />
								{ this.state.username }
							<Icon type="down" />
						</Button>
					</Dropdown>
				</div>
			</Header>
		)
	}
	
	componentDidMount(){
		let _self = this
		
		reqwest({
			url: `${ _self.props.THE_HOST }/username`,
			method: 'post',
			data: { "token": _self.props.token },
			type: 'json'
		}).then((res) => {
			if(res.code === "1"){
				_self.setState({ username: res.username })
				let { dispatch } = this.props
				dispatch( getUser(res.username) )
			}
			else{
				console.log(res.message)
			}
		}, (err, msg) => {
			console.log("请求失败，请重试")
		})
	}
}

Head.propTypes = {
	routerPush: PropTypes.func.isRequired
}

// lead stores in
const mapStateToProps = state => ({
	THE_HOST: state.todos.THE_HOST,
	token: state.todos.token
})

export default connect(mapStateToProps)(Head);