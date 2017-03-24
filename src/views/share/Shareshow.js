import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, message, Col, Row, Card } from 'antd';
import reqwest from 'reqwest';

class Shareshow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			leftSide: [],
			rightSide: []
		}
	}
	
	pullShare(){
		let _self = this
		
		reqwest({
			url: 'http://localhost:3337/techshare',
			method: 'post',
			data: {
				
			},
			type: 'json'
		}).then((resp) => {
			if(resp.code === "1"){
				_self.setState({
					leftSide: resp.leftSide,
					rightSide: resp.rightSide
				})
			}
			else{
				message.warning(resp.message, 2)
			}
		}, (err, msg) => {
			message.warning('获取分享失败，请重试')
		})
	}
	
	componentWillMount(){
		
	}
	
	render(){
		return (
			<div>
				<div className="bd-cnt">
					<Breadcrumb className="font-14">
						<Breadcrumb.Item>技术分享</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="cnt-inner">
					<Row gutter={ 40 } >
						<Col span={ 12 } >
							{
								this.state.leftSide.map( ( item, index ) => (
									<Card className="marb-30" title={ item.username } extra={ <span className="color-blue">{ `发布于${ item.date }` }</span> } key={ index } >
										{
											item.shareText.split('\n').map( ( item, index ) => (
												<p key={ index } >
													{ item }
												</p>
											) ) 
										}
									</Card>
								) )
							}
						</Col>
						<Col span={ 12 } >
							{
								this.state.rightSide.map( ( item, index ) => (
									<Card className="marb-30" title={ item.username } extra={ <span className="color-blue">{ `发布于${ item.date }` }</span> } key={ index } >
										{
											item.shareText.split('\n').map( ( item, index ) => (
												<p key={ index } >
													{ item }
												</p>
											) ) 
										}
									</Card>
								) )
							}
						</Col>
					</Row>
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('3')
		this.pullShare()
	}
}

// lead stores in
const mapStateToProps = state => ({
	token: state.todos.token
})

export default connect(mapStateToProps)(Shareshow)
