import React, { Component } from 'react';
import { Link } from 'react-router';
import { loginInfo } from '../../reducers/reducerLogin';

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
		if(!loginInfo.loginStatus)this.props.router.push({ pathname: '/login' })
	}
	
	render(){
		return (
			<Layout>
				<Head></Head>
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
	}
}

export default User
