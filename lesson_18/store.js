import { createStore, combineReducers  } from 'redux';
import studentsReducer from './reducers/students';
import counterReducer from './reducers/counter';
import toggleReducer from './reducers/toggle';



export const Store = createStore(combineReducers({
    students: studentsReducer,
    counter: counterReducer,
    enabled: toggleReducer,
}));

