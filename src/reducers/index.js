import { combineReducers } from 'redux';
import todos from './reducerLogin';

const todoApp = combineReducers({
	todos
})

export default todoApp