import { createStore, combineReducers  } from 'redux';
import studentsReducer from './reducers/students';
import counterReducer from './reducers/counter';



export const Store = createStore(combineReducers({
    students: studentsReducer,
    counter: counterReducer
}));

console.log(Store.getState());

