import { createStore, combineReducers, applyMiddleware  } from 'redux';
import studentsReducer from './reducers/students';
import counterReducer from './reducers/counter';
import toggleReducer from './reducers/toggle';
import loggerMiddleware from './middlewares/logger';
import countUpdaterMiddleware from './middlewares/count_updater';
import storageMiddleware from './middlewares/storage';
import deduplicatorMiddleware from './middlewares/deduplicator';


export const Store = createStore(
    combineReducers({
        students: studentsReducer,
        counter: counterReducer,
        enabled: toggleReducer,
    }),
    applyMiddleware(
        loggerMiddleware, 
        deduplicatorMiddleware,
        countUpdaterMiddleware,        
        storageMiddleware,        
    ),
);

