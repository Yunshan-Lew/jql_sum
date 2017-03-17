import React, { Component } from 'react';
import { Link } from 'react-router';
import { Table, Breadcrumb } from 'antd';
import reqwest from 'reqwest';
// import './Totallist.css';

const columns = [{
	title: '总结期数',
	dataIndex: 'totalIndex',
	key: '0'
}, {
	title: '汇总日期',
	dataIndex: 'date',
	key: '1'
}, {
	title: '操作',
	dataIndex: 'date',
	key: '2',
	render: (text, record) => (
		<Link to={ `/user/inside/${ record.date.replace(/\D/g, '') }` }>查看详情</Link>
	)
}]

class TotalList extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			data: [/*{
				key: 0,
				totalIndex: '1970年1月第3期总结汇总',
				date: '1970-01-15'
			}, {
				key: 1,
				totalIndex: '1970年1月第2期总结汇总',
				date: '1970-01-08'
			}, {
				key: 2,
				totalIndex: '1970年1月第1期总结汇总',
				date: '1970-01-01'
			}*/],
			
			pagination: {
				current: 1,
				pageSize: 10
			},
			
			loading: false
		}
	}
	
	handleTableChange(pagination, filters, sorter){
		const pager = this.state.pagination
		pager.current = pagination.current
		
		this.setState({
			pagination: pager,
		})
		
		this.pullData({
			page: pagination.current,
		})
	}
	
	pullData(params = {}){
		this.setState({ loading: true });
		
		reqwest({
			url: 'http://localhost:3337/totallist',
			method: 'post',
			data: {
				...params
			},
			type: 'json'
		}).then((data) => {
			const pagination = this.state.pagination
			pagination.total = data.total
			this.setState({
				loading: false,
				data: data.results,
				pagination
			})
		})
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
					<Table className="table-fixed" columns={ columns } dataSource={ this.state.data } pagination={ this.state.pagination } onChange={ this.handleTableChange } loading={ this.state.loading } />
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('1')
		this.pullData({ page: 1 })
	}
}

export default TotalList;
