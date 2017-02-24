import React, { Component } from 'react';
import { Link } from 'react-router';
import { Table, Breadcrumb } from 'antd';
// import './Totallist.css';

const columns = [{
	title: '总结期数',
	dataIndex: 'sum_index',
	key: 'sum_index'
}, {
	title: '汇总日期',
	dataIndex: 'sum_date',
	key: 'sum_date'
}, {
	title: '操作',
	dataIndex: 'action',
	key: 'action',
	render: (text, record) => (
		<Link to={ "/user/inside/" + record.inside_date }>查看详情</Link>
	)
}]

class TotalList extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			data: [{
				key: 1,
				sum_index: '1970年1月第3期总结汇总',
				sum_date: '1970-01-15',
				inside_date: '19700115'
			}, {
				key: 2,
				sum_index: '1970年1月第2期总结汇总',
				sum_date: '1970-01-08',
				inside_date: '19700108'
			}, {
				key: 3,
				sum_index: '1970年1月第1期总结汇总',
				sum_date: '1970-01-01',
				inside_date: '19700101'
			}]
		}
	}
	
	render() {
		return (
			<div>
				<div className="bd-cnt">
					<Breadcrumb className="font-14">
						<Breadcrumb.Item>总结汇总</Breadcrumb.Item>
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
}

export default TotalList;
