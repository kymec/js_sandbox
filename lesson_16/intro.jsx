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
                <div id="logo"></div>
                <h1>Read books</h1>
                <p id="description">Create your account to get started. After that, you can share books and make friends.</p>                
                <button id="buttonIntro" onClick={this.props.next}>Next</button>
            </div>
        );
    }
}