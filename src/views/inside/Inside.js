import React, { Component } from 'react';
import { Link } from 'react-router';
import { Table, Breadcrumb } from 'antd';
import reqwest from 'reqwest';
// import styles from './Inside.css';

const columns = [{
	title: '总结人',
	dataIndex: 'username',
	key: '0'
}, {
	title: '职务',
	dataIndex: 'job',
	key: '1'
}, {
	title: '总结日期',
	dataIndex: 'date',
	key: '2'
}, {
	title: '操作',
	dataIndex: 'date',
	key: '3',
	render: (text, record) => (
		<Link to={ `/user/summary/${ record.date.replace(/\D/g, '') }?_id=${ record._id }` }>查看详情</Link>
	)
}];

class Inside extends Component {
	constructor(props){
		super(props)
		this.state = {
			data: [/*{
				key: 0,
				username: 'Alice',
				job: '洗碗工',
				date: '1970-01-15'
			}*/],
			
			pagination: {
				current: 1,
				pageSize: 10
			},
			
			loading: false
		}
	}
	
	handleTableChange(pageC, filters, sorter){
		const pager = this.state.pagination
		pager.current = pageC.current
		
		this.setState({
			pagination: pager,
		})
		
		this.pullData()
	}
	
	pullData( params = { ...this.state.pagination, dateNumber: this.props.params.date } ){
		this.setState({ loading: true });
		
		reqwest({
			url: 'http://localhost:3337/inside',
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
	
	componentWillMount(){
		
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
					<Table className="table-fixed" columns={ columns } dataSource={ this.state.data } pagination={ this.state.pagination } onChange={ this.handleTableChange.bind(this) } loading={ this.state.loading } />
				</div>
			</div>
		)
	}
	
	componentDidMount(){
		this.props.catchCurrent('1')
		this.pullData()
	}
}

export default Inside
