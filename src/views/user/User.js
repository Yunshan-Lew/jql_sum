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
			subCurrent: 'sub1',
			current: '1'
		}
	}
	
	catchCurrent(s, i){
		this.setState({
			subCurrent: s,
			current: i
		})
	}
	
	subSwift({ key, domEvent }){
		key = key === this.state.subCurrent ? '' : key
		this.setState({
			subCurrent: key
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
						<Menu theme="dark" mode="inline" openKeys={ [this.state.subCurrent] } selectedKeys={ [this.state.current] } className="jql-menu">
							
							<Menu.SubMenu key="sub1" title={ <span className="font-14"><Icon type="file-text" /><span>总结管理</span></span> } onTitleClick={ this.subSwift.bind(this) } >
								<Menu.Item key="sub1-1" className="menu-high" >
									<Link to="/user/totallist">
										<span className="nav-text">总结汇总</span>
									</Link>
								</Menu.Item>
								<Menu.Item key="sub1-2" className="menu-high">
									<Link to="/user/message">
										<span className="nav-text">总结提交</span>
									</Link>
								</Menu.Item>
							</Menu.SubMenu>
							
							<Menu.SubMenu key="sub2" title={ <span className="font-14"><Icon type="share-alt" /><span>分享管理</span></span> }  onTitleClick={ this.subSwift.bind(this) } >
								<Menu.Item key="sub2-1" className="menu-high">
									<Link to="/user/shareshow">
										<span className="nav-text">技术分享</span>
									</Link>
								</Menu.Item>
								<Menu.Item key="sub2-2" className="menu-high">
									<Link to="/user/sharesubmit">
										<span className="nav-text">发布分享</span>
									</Link>
								</Menu.Item>
							</Menu.SubMenu>
							
							<Menu.SubMenu key="sub3" title={ <span className="font-14"><Icon type="setting" /><span>设置</span></span> } onTitleClick={ this.subSwift.bind(this) } >
								<Menu.Item key="sub3-1" className="menu-high">
									<Link to="/set/password">
										<span className="nav-text">修改密码</span>
									</Link>
								</Menu.Item>
							</Menu.SubMenu>
						
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
