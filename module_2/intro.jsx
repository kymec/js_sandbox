import React from 'react';
import SecondPage from './secondPage';

export default class Intro extends React.Component {
    constructor() {
        super();
        this.state = {
            intro: 'block',
            pageShow: 'intro',
            hide: 'block',
        }
    }
    show(page) {
            if (page === 'intro') {
                this.setState({
                    intro: 'block',
                    secondPage: 'none',
                    thirdPage: 'none',
                    result: 'none',
                });
            } else if (page === 'secondPage'){
                this.setState({
                    intro: 'none',
                    secondPage: 'block',
                    thirdPage: 'none',
                    result: 'none',
                });
            } else if (page === 'thirdPage'){
                this.setState({
                    intro: 'none',
                    secondPage: 'none',
                    thirdPage: 'block',
                    result: 'none',
                });
            } else if (page === 'result'){
                this.setState({
                    intro: 'none',
                    secondPage: 'none',
                    thirdPage: 'none',
                    result: 'block',
                });
            } 
    }
    introClick() {
        this.setState({pageShow: 'secondPage'})
        this.show('secondPage');
    }
    render() {
        return (
            <div  
                id="mainIntro"
                style={{display: `${this.state.intro}`}}
            >
                <div id="logo"></div>
                <h1>Read books</h1>
                <div id="description">Create your account to get started. After that, you can share books and make friends.</div>
                <div 
                    id="buttonIntro"
                    onClick={this.introClick.bind(this)}
                ></div>
            </div>
        );
    }
}