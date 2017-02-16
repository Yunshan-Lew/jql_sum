import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory, IndexRedirect } from 'react-router';
import { createHashHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import { Layout } from 'antd';

import Login from './views/login/Login';

import User from './views/user/User';
import TotalList from './views/totallist/Totallist';
import Inside from './views/inside/Inside';
import Message from './views/message/Message';
import Summary from './views/summary/Summary';

import './index.css';

const history = useRouterHistory(createHashHistory)({ 
	basename: '',
	queryKey: true
})

const store = createStore(reducer)

const App = React.createClass({
	getInitialState(){
		return {
			
		}
	},
	
	componentWillMount(){
		
	},
	
	render(){
		return (
			<Provider store={ store }>
				<Layout>
					{ this.props.children }
				</Layout>
			</Provider>
		)
	},
	
	componentDidMount(){
		document.title = 'JQL Technolegy Department'
	}
});

ReactDOM.render(
	<Router history={ history }>
		<Route path="/" component={ App } >
			<Route path="login" component={ Login } />
			<Route path="user" component={ User } > 
				<IndexRoute component={ TotalList } />
				<Route path="totallist" component={ TotalList } />
				<Route path="inside" component={ Inside } />
				<Route path="message" component={ Message } />
				<Route path="summary" component={ Summary } />
				<Route path="*" component={ TotalList } />
			</Route>
			<IndexRedirect to="/user" />
		</Route>
	</Router>
	,
	document.getElementById('root')
);
