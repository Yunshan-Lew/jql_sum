import React, { Component } from 'react';
import { Layout } from 'antd';

import styles from './Account.css';

class Account extends Component {
	constructor(props) {
		super(props)
		this.state = {
			minH: 'auto',
			margT: 0
		}
	}
	
	componentWillMount(){
		
	}
	
	render(){
		return (
			<Layout className={ styles['login-bg'] } style={ { minHeight: this.state.minH } }>
				<div className={ styles['login-box'] } style={ { marginTop: this.state.margT } }  ref="formBox">
					{ this.props.children }
				</div>
				<p className={ 'font-14 text-center ' + styles['login-bt'] }>
					&copy;2014-{ new Date().getYear() + 1900 } JQL.CN Technolegy Department
				</p>
			</Layout>
		)
	}
		
	componentDidMount(){
		let H = document.documentElement.clientHeight
		let h = this.refs.formBox.clientHeight
		this.setState({ 
			minH: `${ H }px`, 
			margT: `${ ( H - h ) / 2.2 }px`
		})
	}
			
}

export default Account;
