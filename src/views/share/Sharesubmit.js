import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Breadcrumb, Form, Button, Modal, message } from 'antd';
import LzEditor from 'react-lz-editor';
import reqwest from 'reqwest';

const FormItem = Form.Item
const Confirm = Modal.confirm

class Sharesubmit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			leave: false,
			shareText: 'const Start = ( ) => "Let\'s write a share!"'
		}
	}
	
	routerWillLeave(nextLocation){
		if(!this.state.leave){
			let _self = this
			Confirm({
				title: '温馨提示',
				content: '分享尚未提交，确认要离开？',
				onOk(){
					_self.state.leave = true
					browserHistory.push(nextLocation)
				},
				okText: '离开',
				cancelText: '留下'
			})
		}
		return this.state.leave
    }
	
	receiveHtml(content) {
		this.setState({
			shareText: content
		})
	}
	
	subShare(){
		let _self = this
		
		if(_self.state.shareText.length < 23){
			message.error('分享长度不足15字')
			return
		}
		
		Confirm({
			title: '温馨提示',
			content: '提交后可在技术分享中查看，确认要提交？',
			onOk(){
				reqwest({
					url: `${ _self.props.THE_HOST }/share`,
					method: 'post',
					data: {
						"token": _self.props.token, 
						"shareText": _self.state.shareText 
					},
					type: 'json'
				}).then( resp => {
					if(resp.code === "1"){
						_self.state.leave = true
						browserHistory.push({ pathname: '/user/shareshow' })
					}
					else{
						message.warning(resp.message, 2)
					}
				}, (err, msg) => {
					message.warning('分享发布失败，请重试')
				})
					
			}
		})
	}
	
	updateText(txt){
        this.setState({
            shareText: txt
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
						<Breadcrumb.Item>发布分享</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="cnt-inner">
					<Form className="sum-form tall">
						<FormItem label="分享内容">
							<LzEditor
								importContent={ this.state.shareText }
								cbReceiver={ this.receiveHtml.bind(this) }
								uploadConfig={ uploadConfig }
								fullScreen={ false }
								convertFormat="html"
								autoSave={ false }
							 />
						</FormItem>
						<FormItem className="text-center">
							<Button type="primary" size="large" icon="notification" onClick={ this.subShare.bind(this) } >
								发 布
							</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('sub2', '4')
		// 设未完离开提示
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
		
	}
}

// lead stores in
const mapStateToProps = state => ({
	THE_HOST: state.todos.THE_HOST,
	token: state.todos.token
})

export default connect(mapStateToProps)(Sharesubmit)
