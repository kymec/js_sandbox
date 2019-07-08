import React from 'react';
import ReactDOM from 'react-dom';
import WrapInEmoji from './wrapinemoji';
import Timer from './timer';


window.render = function render() {
    ReactDOM.render((
        <div>
            <WrapInEmoji defaultEmoji="😀">Some Text</WrapInEmoji>
            <Timer />
        </div>
        ), document.getElementById('root'));
}
render();
