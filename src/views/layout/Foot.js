import React, { Component } from 'react';

import { Layout } from 'antd';

const { Footer } = Layout;

class Foot extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}
	
	render(){
		return (
			<Footer className="jql-footer text-center">
				<span className="font-14">&copy;2014-2017 JQL.CN Technolegy Department</span>
			</Footer>
		)
	}
}

export default Foot;