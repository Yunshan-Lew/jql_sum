import { combineReducers } from 'redux';
import todos from './reducerLogin';
import testTodos from './reducerTest';

const todoApp = combineReducers({
	todos,
	testTodos
})

export default todoApp