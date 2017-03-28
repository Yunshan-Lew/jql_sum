import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, message, Col, Row, Card, Icon } from 'antd';
import reqwest from 'reqwest';

class Shareshow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			leftSide: [],
			rightSide: []
		}
	}
	
	showSwift(side, index){
		if(side === 'l'){
			let leftSide = this.state.leftSide
			leftSide[index].showAll = !leftSide[index].showAll
			this.setState({
				leftSide: leftSide
			})
		}
		else{
			let rightSide = this.state.rightSide
			rightSide[index].showAll = !rightSide[index].showAll
			this.setState({
				rightSide: rightSide
			})
		}
	}
	
	likeSwift(share_id, side, index){
		let _self = this
		
		reqwest({
			url: 'http://localhost:3337/like',
			method: 'post',
			data: {
				"token": _self.props.token,
				"share_id": share_id
			},
			type: 'json'
		}).then((resp) => {
			if(resp.code === "1"){
				if(side === 'l' && resp.message === "like succeed"){
					let leftC = _self.state.leftSide
					leftC[index].like += 1
					leftC[index].isFans = true
					_self.setState({
						leftSide: leftC
					});
				}
				else if(side === 'l' && resp.message === "dislike succeed"){
					let leftC = _self.state.leftSide
					leftC[index].like -= 1
					leftC[index].isFans = false
					_self.setState({
						leftSide: leftC
					});
				}
				else if(side === 'r' && resp.message === "like succeed"){
					let rightC = _self.state.rightSide
					rightC[index].like += 1
					rightC[index].isFans = true
					_self.setState({
						rightSide: rightC
					});
				}
				else if(side === 'r' && resp.message === "dislike succeed"){
					let rightC = _self.state.rightSide
					rightC[index].like -= 1
					rightC[index].isFans = false
					_self.setState({
						rightSide: rightC
					});
				}
			}
			else{
				message.warning(resp.message, 2)
			}
		}, (err, msg) => {
			message.warning('获取分享失败，请重试')
		})
	}
	
	pullShare(){
		let _self = this
		
		reqwest({
			url: 'http://localhost:3337/techshare',
			method: 'post',
			data: {
				token: _self.props.token
			},
			type: 'json'
		}).then((resp) => {
			if(resp.code === "1"){
				resp.leftSide.forEach( (item) => {
					item.showAll = false
				})
				
				resp.rightSide.forEach( (item) => {
					item.showAll = false
				})
				
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
						{
							this.state.leftSide.length === 0 ?
							<h1 className="text-center color-gray">
								<Icon type="frown-o icon-right" />
								暂无分享
							</h1> : 
							void(0)
						}
						<Col span={ 12 } >
							{
								this.state.leftSide.map( ( item, index ) => (
									<div key={ index } >
										<Card className={ `card-dash ${ !item.showAll ? 'share-h' : '' }` } title={
											<b>
												<Icon type="notification" className="icon-right" />
												{ item.username }
											</b>
										} extra={ <span className="color-blue">{ `发布于${ item.date }` }</span> } >
											{
												item.shareText.split('\n').map( ( text, line ) => (
													<p key={ line } >
														{ text.replace('\t', '　　') }
													</p>
												) ) 
											}
											{	
												!item.showAll ?
												<div className="bg-fff color-blue text-center show-all" onClick={ this.showSwift.bind(this, 'l', index) } >
													展开全部
												</div> :
												<div className="bg-fff color-blue text-center show-all" onClick={ this.showSwift.bind(this, 'l', index) } >
													固定高度
												</div>
											}
										</Card>
										<div className="like-box text-right">
											喜欢？赞一个
											<a className="like-it" onClick={ this.likeSwift.bind(this, item._id, 'l', index) } >
												{ item.isFans ? <Icon type="like" /> : <Icon type="like-o" /> }
											</a>
											<span className="color-blue">{ item.like }</span>
										</div>
									</div>
								) )
							}
						</Col>
						<Col span={ 12 } >
							{
								this.state.rightSide.map( ( item, index ) => (
									<div key={ index } >
										<Card className={ `card-dash ${ !item.showAll ? 'share-h' : '' }` } title={
											<b>
												<Icon type="notification" className="icon-right" />
												{ item.username }
											</b> 
										} extra={ <span className="color-blue">{ `发布于${ item.date }` }</span> } key={ index } >
											{
												item.shareText.split('\n').map( ( text, line ) => (
													<p key={ line } >
														{ text.replace('\t', '　　') }
													</p>
												) ) 
											}
											{
												!item.showAll ?
												<div className="bg-fff color-blue text-center show-all" onClick={ this.showSwift.bind(this, 'r', index) } >
													展开全部
												</div> :
												<div className="bg-fff color-blue text-center show-all" onClick={ this.showSwift.bind(this, 'r', index) } >
													固定高度
												</div> 
											}
										</Card>
										<div className="like-box text-right">
											喜欢？赞一个
											<a className="like-it" onClick={ this.likeSwift.bind(this, item._id, 'r', index) } >
												{ item.isFans ? <Icon type="like" /> : <Icon type="like-o" /> }
											</a>
											<span className="color-blue">{ item.like }</span>
										</div>
									</div>
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
