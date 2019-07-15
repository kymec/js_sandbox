import React from 'react';

export default class Loading extends React.Component {
    constructor(){
        super();
    }
    render() {        
        return (
            <div id="loading" style={{display: `${this.props.display}`}}>
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M16.3821 94.1618C-5.21206 72.8677 -5.45558 37.9756 15.838 16.382C37.1321 -5.21222 72.0236 -5.45633 93.6178 15.8378C115.212 37.132 115.456 72.0235 94.162 93.6177C72.8684 115.211 37.9763 115.456 16.3821 94.1618ZM86.377 23.1807C68.8319 5.87938 40.4822 6.07772 23.1808 23.6228C5.87896 41.1685 6.07788 69.5176 23.623 86.819C41.1681 104.12 69.5172 103.923 86.8191 86.3768C104.12 68.8317 103.922 40.482 86.377 23.1807Z" fill="white"/>
                <path d="M94.1621 93.6177L86.8192 86.3769C104.121 68.8318 103.922 40.4821 86.3771 23.1808L93.6179 15.8379C115.212 37.132 115.456 72.0235 94.1621 93.6177Z" fill="white"/>
                </svg>
                <div id="loadingText">We are signing you up</div>
            </div>
        );
    }
}