import React from 'react';

export default class Result extends React.Component {
    
    render() {
        return (
            <div id="result">
                <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="68" cy="68" r="68" fill="url(#paint0_linear)" fill-opacity="0.8"/>
                <path d="M56.518 104.746C56.2799 104.746 56.0441 104.699 55.8242 104.608C55.6042 104.517 55.4043 104.384 55.2359 104.216L32.2051 81.1836L34.768 78.6207L56.327 100.18L100.872 41.1877L103.764 43.3712L57.968 104.021C57.8118 104.231 57.6121 104.404 57.3827 104.529C57.1533 104.654 56.8995 104.728 56.6388 104.746C56.6013 104.746 56.559 104.746 56.518 104.746Z" fill="white"/>
                <defs>
                <linearGradient id="paint0_linear" x1="-114" y1="-144" x2="412.88" y2="129.7" gradientUnits="userSpaceOnUse">
                <stop stop-color="#72FF99"/>
                <stop offset="1" stop-color="#00D23A"/>
                </linearGradient>
                </defs>
                </svg>
                <h1 id="resultH1">Welcome</h1>
            </div>
        );
    }
}