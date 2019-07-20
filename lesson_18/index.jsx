import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Store } from './store';
import * as Constants from './actions';



function List(props) {
    let newName='';
    return (
        <div>
            {props.list.map(student => (
                <div 
                    key={student.name} 
                    onClick={props.remove.bind(null, student.name)}
                >
                    {student.name}
                </div>
            ))}
            <input onChange={(event) => newName = event.target.value}></input>
            <button onClick={() => props.add(newName)}>
                Add Student
            </button><br />
            <button onClick={() => props.countIncrement()}>+</button>
            <div>{props.count}</div><br />
            <label>
                <input onChange={() => props.check()} type="checkbox" />
                Check
            </label>
        </div>
    )
}

const ListConnected = connect (
    (state) => ({ 
        list: state.students,
        count: state.counter.count,
        enabled: state.toggle,
    }),
    (dispatch) => ({ 
        remove: (name) => dispatch({ type: Constants.REMOVE, name }),
        add: (name) => dispatch({ type: Constants.ADD, name }),
        countIncrement: () => dispatch({ type: Constants.ADD_COUNT}),
        check: () => dispatch({ type: Constants.CHECK}),
    }),
)(List);


ReactDOM.render((
    <Provider store={Store}>
        <ListConnected />
    </Provider>
    ), document.getElementById('root'));


