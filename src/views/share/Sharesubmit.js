import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Breadcrumb, Form, Button, Modal, message } from 'antd';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import reqwest from 'reqwest';

const FormItem = Form.Item
const Confirm = Modal.confirm

class Sharesubmit extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			loading: false,
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
				onCancel(){
					void(0)
				}
			})
		}
		return this.state.leave
    }
	
	subShare(){
		let _self = this
		Confirm({
			title: '温馨提示',
			content: '提交后可在技术分享中查看，确认要提交？',
			onOk(){
				_self.setState({ loading: true })
				
				reqwest({
					url: 'http://localhost:3337/share',
					method: 'post',
					data: {
						"token": _self.props.token, 
						"shareText": _self.state.shareText 
					},
					type: 'json'
				}).then((resp) => {
					_self.setState({ loading: false })
					
					if(resp.code === "1"){
						_self.state.leave = true
						browserHistory.push({ pathname: '/user/shareshow' })
					}
					else{
						message.warning(resp.message, 2)
					}
				}, (err, msg) => {
					_self.setState({ loading: false })
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
		const editorOps = {
            lineNumbers: true,
			cursorBlinkRate: 400,
			showCursorWhenSelecting: true,
			theme: 'monokai',
			mode: 'javascript'
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
							<CodeMirror value={ this.state.shareText } onChange={ this.updateText.bind(this) } options={ editorOps } />
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
		this.props.catchCurrent('4')
		// 设未完离开提示
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
		
	}
}

// lead stores in
const mapStateToProps = state => ({
	token: state.todos.token
})

export default connect(mapStateToProps)(Sharesubmit)
