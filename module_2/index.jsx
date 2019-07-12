import React from 'react';
import ReactDOM from 'react-dom';
import '/style.css';
import Intro from './intro';
import SecondPage from './secondpage';



window.render = function render() {
    ReactDOM.render((
        <div>
            <Intro />
            <SecondPage></SecondPage>
            
        </div>
        ), document.getElementById('root'));
}
render();