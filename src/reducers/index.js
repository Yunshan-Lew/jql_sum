import { combineReducers } from 'redux';
import todos from './reducerLogin';
import testTodos from './reducerTest';
import userTodos from './reducerUser';

const todoApp = combineReducers({
	todos,
	testTodos,
	userTodos
})

export default todoApp