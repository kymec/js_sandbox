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
            <div id="countries">
                <CountrySelect
                    maxHeight={150}
                    defaultCountry="AF"
                    disabled="true"
                />
                <CountrySelect
                    maxHeight={250}
                    defaultCountry="DZ"
                />
                <CountrySelect
                    maxHeight={500}
                    defaultCountry="UA"
                />
            </div>
        </div>
        ), document.getElementById('root'));
}
render();
