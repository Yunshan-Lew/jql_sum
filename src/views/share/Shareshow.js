import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, message, Col, Row, Card, Icon, Button, Modal } from 'antd';
import LzEditor from 'react-lz-editor';
import reqwest from 'reqwest';

class Shareshow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			leftSide: [],
			rightSide: [],
			pageSize: 10,
			target: 1,
			couldMore: true,
			modalV: false,
			forEdit: '',
			dateEdit: ''
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
			url: `${ _self.props.THE_HOST }/like`,
			method: 'post',
			data: {
				"token": _self.props.token,
				"share_id": share_id
			},
			type: 'json'
		}).then( resp => {
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
			url: `${ _self.props.THE_HOST }/techshare`,
			method: 'post',
			data: {
				token: _self.props.token,
				target: _self.state.target,
				pageSize: _self.state.pageSize
			},
			type: 'json'
		}).then( resp => {
			if(resp.code === "1"){
				if(resp.leftSide.length === 0){
					_self.setState({
						couldMore: false
					})
					message.warning('没有更多数据了', 2)
					return 
				}
	
				resp.leftSide.forEach( item => {
					item.showAll = false
				})
				
				resp.rightSide.forEach( item => {
					item.showAll = false
				})
				
				let leftOld = _self.state.leftSide
				let leftNew = leftOld.concat(resp.leftSide)
				
				let rightOld = _self.state.rightSide
				let rightNew = rightOld.concat(resp.rightSide)
				
				let targetNew = this.state.target + 1 
				
				_self.setState({
					leftSide: leftNew,
					rightSide: rightNew,
					target: targetNew
				})
			}
			else{
				message.warning(resp.message, 2)
			}
		}, (err, msg) => {
			message.warning('获取分享失败，请重试')
		})
	}
	
	beginEdit(txt, date){
		this.setState({
			forEdit: txt,
			dateEdit: date,
			modalV: true
		})
	}
	
	subEdit(){
		let _self = this
		
		if(_self.state.forEdit.length < 23){
			message.error('分享长度不足15字')
			return
		}
		
		reqwest({
			url: `${ _self.props.THE_HOST }/editshare`,
			method: 'post',
			data: {
				"token": _self.props.token, 
				"forEdit": _self.state.forEdit,
				"date": _self.state.dateEdit
			},
			type: 'json'
		}).then( resp => {
			if(resp.code === "1"){
				message.success(resp.message, 1.5, () => {
					location.reload()
				})
			}
			else{
				message.warning(resp.message)
			}
		}, (err, msg) => {
			message.warning('分享发布失败，请重试')
		})
	}
	
	receiveHtml(content) {
		this.setState({
			forEdit: content
		})
	}
	
	componentWillMount(){
		
	}
	
	render(){
		const uploadConfig = {
			QINIU_URL: "", //上传地址
			QINIU_IMG_TOKEN_URL: "", //请求图片的token
			QINIU_PFOP: {
				url: "" //持久保存请求地址
			},
			QINIU_VIDEO_TOKEN_URL: "", //请求媒体资源的token
			QINIU_FILE_TOKEN_URL: "", //其他资源的token的获取
			QINIU_IMG_DOMAIN_URL: "", //图片文件地址的前缀
			QINIU_DOMAIN_VIDEO_URL: "", //视频文件地址的前缀
			QINIU_DOMAIN_FILE_URL: "" //其他文件地址前缀
		}
		
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
											<div dangerouslySetInnerHTML={{ __html: item.shareText }} ></div>
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
											{
												this.props.username === item.username ?
												<Button type="default" size="small" icon="edit" className="pull-left" onClick={ this.beginEdit.bind(this, item.shareText, item.date) }>修改</Button> :
												void(0)
											}
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
										} extra={ <span className="color-blue">{ `发布于${ item.date }` }</span> } >
											<div dangerouslySetInnerHTML={{ __html: item.shareText }} ></div>
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
											{
												this.props.username === item.username ?
												<Button type="default" size="small" icon="edit" className="pull-left" onClick={ this.beginEdit.bind(this, item.shareText, item.date) }>修改</Button> :
												void(0)
											}
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
					<div className="text-center">
						{
							( this.state.couldMore && this.state.leftSide.length ) ? 
							<Button size="large" icon="download" onClick={
								this.pullShare.bind(this)
							} >加载更多</Button> :
							void(0)
						}
					</div>
					<Modal title="修改分享" width={ 1024 } visible={ this.state.modalV } maskClosable={ false } onOk={ this.subEdit.bind(this) } onCancel={ () => {
						this.setState({
							modalV: false
						})
					} } >
						<LzEditor
							active={ true }
							importContent={ this.state.forEdit }
							cbReceiver={ this.receiveHtml.bind(this) }
							uploadConfig={ uploadConfig }
							fullScreen={ false }
							convertFormat="html"
							autoSave={ false }
						/>
					</Modal>
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('sub2', 'sub2-1')
		this.pullShare()
	}
}

// lead stores in
const mapStateToProps = state => ({
	THE_HOST: state.todos.THE_HOST,
	token: state.todos.token,
	username: state.userTodos.username
})

export default connect(mapStateToProps)(Shareshow)
