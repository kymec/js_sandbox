import React from 'react';
import ReactDOM from 'react-dom';
import WrapInEmoji from './wrapinemoji';
import Timer from './timer';
import CountrySelect from './countryselect';


window.render = function render() {
    ReactDOM.render((
        <div>
            <WrapInEmoji defaultEmoji="😀">Some Text</WrapInEmoji>
            <Timer />
            <CountrySelect maxheight="200px" />
        </div>
        ), document.getElementById('root'));
}
render();
