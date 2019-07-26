import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from './store';
import List from './components/students_list';

ReactDOM.render((
    <Provider store={Store}>
        <List />
    </Provider>
    ), document.getElementById('root'));


