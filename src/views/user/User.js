import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pullLogin, pullToken } from '../../actions/actionLogin';

import { Layout, Menu, Icon } from 'antd';
import Head from '../layout/Head';
import Foot from '../layout/Foot';

const { Sider, Content } = Layout;

class User extends Component {
	constructor(props){
		super(props)
		this.state = {
			minH: 'initial',
			current: '1'
		}
	}
	
	catchCurrent(i){
		this.setState({
			current: i
		})
	}
	
	componentWillMount(){
		this.props.pullToken()
		this.props.pullLogin()
	}
	
	render(){
		return (
			<Layout>
				<Head routerPush={ browserHistory.push }></Head>
				<Layout className="mid-box" style={{ minHeight: this.state.minH }}>
					<Sider>
						 <Menu theme="dark" mode="inline" selectedKeys={ [this.state.current] } className="jql-menu">
							<Menu.Item key="1" className="menu-high">
								<Link to="/user/totallist">
									<Icon type="file-text" className="font-14" />
									<span className="nav-text font-14">总结汇总</span>
								</Link>
							</Menu.Item>
							<Menu.Item key="2" className="menu-high">
								<Link to="/user/message">
									<Icon type="edit" className="font-14" />
									<span className="nav-text font-14">总结提交</span>
								</Link>
							</Menu.Item>
							<Menu.Item key="3" className="menu-high">
								<Link to="/user/shareshow">
									<Icon type="like-o" className="font-14" />
									<span className="nav-text font-14">技术分享</span>
								</Link>
							</Menu.Item>
							<Menu.Item key="4" className="menu-high">
								<Link to="/user/sharesubmit">
									<Icon type="share-alt" className="font-14" />
									<span className="nav-text font-14">发布分享</span>
								</Link>
							</Menu.Item>
							<Menu.Item key="5" className="menu-high">
								<Link to="/set/password">
									<Icon type="setting" className="font-14" />
									<span className="nav-text font-14">修改密码</span>
								</Link>
							</Menu.Item>
						</Menu>
					</Sider>
					<Content>
						{ 
							this.props.children && React.cloneElement(this.props.children, {
								catchCurrent: this.catchCurrent.bind(this)
							})
						}
					</Content>
				</Layout>
				<Foot></Foot>
			</Layout>
		)
	}
	
	componentDidMount(){
		this.setState({ minH: ( document.documentElement.clientHeight - 180 ) + 'px' })
		// 因为mapDispatchToProps的动作延迟，所以token打印为空，但会在稍后的componentDidUpdate中更新
		console.log(`${ this.props.testMsg }, the token is ${ this.props.token }`)
	}
	
}

const actions = { pullLogin, pullToken }

// lead stores in
const mapStateToProps = state => ({
	loginStatus: state.todos.loginStatus,
	token: state.todos.token,
	testMsg: state.testTodos.testMsg
})

// lead actions in
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(User)
