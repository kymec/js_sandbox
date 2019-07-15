import React from 'react';

export default class Fail extends React.Component {
    
    render() {
        return (
            <div id="fail">
                <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="68" cy="68" r="68" fill="url(#paint0_linear)" fill-opacity="0.8"/>
                <path d="M56.518 41.9129C56.2799 41.9128 56.0441 41.9596 55.8242 42.0506C55.6042 42.1416 55.4043 42.275 55.2359 42.4433L32.2051 65.4754L34.768 68.0382L56.327 46.4792L100.872 105.471L103.764 103.288L57.968 42.6379C57.8118 42.4283 57.6121 42.2551 57.3827 42.1299C57.1533 42.0048 56.8995 41.9308 56.6388 41.9129C56.6013 41.9129 56.559 41.9129 56.518 41.9129Z" fill="white"/>
                <defs>
                <linearGradient id="paint0_linear" x1="-114" y1="-144" x2="412.88" y2="129.7" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FF727A"/>
                <stop offset="1" stop-color="#D2000D"/>
                </linearGradient>
                </defs>
                </svg>

                <h1 id="failH1">Fail</h1>
                <div id="failText">Internal server Error</div>
            </div>
        );
    }
}