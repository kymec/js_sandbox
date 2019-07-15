import React from 'react';

export default class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'intro',
        }
    }
    render() {        
        return (
            <div id="mainIntro">
                <svg id="introBall1" width="75" height="75" viewBox="0 0 54 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16.5" cy="37.5" r="37.5"/>
                </svg>
                <svg id="introBall2" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="44.9013" cy="44.9012" r="36.3654" transform="rotate(-15.8189 44.9013 44.9012)"/>
                </svg>
                <div id="introBook">
                <svg id="introBookSvg" width="86" height="78" viewBox="0 0 86 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M81.5 7.83325H79.6667V59.1739C79.6667 61.1961 78.0149 62.8332 75.9909 62.8332C54.0367 62.8314 45.3485 69.3177 45.266 69.3819L42.9817 71.1382L40.734 69.3819C40.6515 69.3177 31.9634 62.8314 10.0092 62.8332C7.98521 62.8332 6.33337 61.1961 6.33337 59.1739L6.33337 7.83325H4.50004C2.47421 7.83325 0.833374 9.47409 0.833374 11.4999L0.833374 73.8333C0.833374 75.8591 2.47421 77.4999 4.50004 77.4999H81.5C83.5259 77.4999 85.1667 75.8591 85.1667 73.8333V11.4999C85.1667 9.47409 83.5259 7.83325 81.5 7.83325Z" fill="url(#paint0_linear)"/>
                <path d="M41.1667 6.67098C37.599 4.67814 28.5515 0.789644 11.87 0.514644C10.8488 0.498144 10 1.33598 10 2.35714L10 57.3571C10 58.36 10.8195 59.1648 11.8223 59.1813C28.5313 59.449 37.5935 63.343 41.1667 65.3376V6.67098Z" fill="url(#paint1_linear)"/>
                <path d="M74.13 0.514644C57.4485 0.789644 48.401 4.67814 44.8334 6.67098L44.8334 65.3376C48.4065 63.343 57.4687 59.449 74.1777 59.1813C75.1805 59.1648 76 58.36 76 57.3571V2.35714C76 1.33598 75.1512 0.498144 74.13 0.514644Z" fill="url(#paint2_linear)"/>
                <defs>
                <linearGradient id="paint0_linear" x1="43" y1="7.83325" x2="43" y2="77.4999" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="white"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="25.5833" y1="0.514404" x2="25.5833" y2="65.3376" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="white"/>
                </linearGradient>
                <linearGradient id="paint2_linear" x1="60.4167" y1="0.514404" x2="60.4167" y2="65.3376" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="white"/>
                </linearGradient>
                </defs>
                </svg>
                </div>      
                <h1 id="h1Intro">Read books</h1>
                <p id="pIntro">Create your account to get started. After that, you can share books and make friends.</p>                
                <button id="buttonIntro" onClick={this.props.next}>
                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 9H20" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
                    <path d="M13 16L20 9L13 2" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
                    </svg>
                </button>
                <svg id="introBall3" width="220" height="113" viewBox="0 0 220 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="84.201" cy="135.9" r="135.533" transform="rotate(-15.8189 84.201 135.9)" fill="url(#paint5_linear)" fill-opacity="0.15"/>
                <defs>
                <linearGradient id="paint5_linear" x1="320.408" y1="-84.5435" x2="-144.406" y2="322.979" gradientUnits="userSpaceOnUse">
                <stop stop-color="#2DEEF9"/>
                <stop offset="1" stop-color="#E084F1"/>
                </linearGradient>
                </defs>
                </svg>

            </div>
        );
    }
}