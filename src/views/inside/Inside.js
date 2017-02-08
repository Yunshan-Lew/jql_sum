import React, { Component } from 'react';
import { Link } from 'react-router';
import { Table, Breadcrumb } from 'antd';

// import styles from './Inside.css';

const columns = [{
	title: '总结人',
	dataIndex: 'sum_person',
	key: 'sum_person'
}, {
	title: '职务',
	dataIndex: 'job',
	key: 'job'
}, {
	title: '总结日期',
	dataIndex: 'sum_date',
	key: 'sum_date'
}, {
	title: '操作',
	dataIndex: 'action',
	key: 'action',
	render: (text, record) => (
		<Link to="/user/summary">查看详情</Link>
	)
}];

class Inside extends Component {
	constructor(props){
		super(props)
		this.state = {
			data: [{
				key: 1,
				sum_person: 'Alice',
				job: '洗碗工',
				sum_date: '1970-01-15'
			}, {
				key: 2,
				sum_person: 'Bob',
				job: '扫地工',
				sum_date: '1970-01-15'
			}, {
				key: 3,
				sum_person: 'Clinton',
				job: '搬砖工',
				sum_date: '1970-01-15'
			}]
		}
	}
	
	componentWillMount(){
		console.log('Welcome to ' + this.props.location.pathname);
	}
	
	render(){
		return (
			<div>
				<div className="bd-cnt">
					<Breadcrumb className="font-14">
						<Breadcrumb.Item>
							<Link to="/user/totallist">总结汇总</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							总结人列表
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="cnt-inner">
					<Table className="table-fixed" columns={ columns } dataSource={ this.state.data } />
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('1')
	}
	
	componentWillUnmount(){
		console.log('Good bye, ' + this.props.location.pathname)
	}
}

export default Inside
