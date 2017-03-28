import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
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
import Sharesubmit from './views/share/Sharesubmit';
import Shareshow from './views/share/Shareshow';
import Password from './views/set/Password';

import outRouteHook from './utils/outRouteHook';
import logRouteHook from './utils/logRouteHook';

import './index.css';

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
	<Router history={ browserHistory } >
		<Route path="/" component={ App }  >
			<Route path="login" component={ Login } onEnter={ outRouteHook } />
			<Route path="user" component={ User } onEnter={ logRouteHook } > 
				<IndexRoute component={ TotalList } />
				<Route path="totallist" component={ TotalList } />
				<Route path="inside/:date" component={ Inside } />
				<Route path="summary/:date" component={ Summary } />
				<Route path="message" component={ Message } />
				<Route path="sharesubmit" component={ Sharesubmit } />
				<Route path="shareshow" component={ Shareshow } />
				<Route path="password" component={ Password } />
				<Route path="*" component={ TotalList } />
			</Route>
			<IndexRedirect to="/user" />
		</Route>
	</Router>
	,
	document.getElementById('root')
);
