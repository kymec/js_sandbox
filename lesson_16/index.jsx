import React from 'react';
import ReactDOM from 'react-dom';
import '/style.css';
import Intro from './intro';
import FirstStep from './firststep';
import SecondStep from './secondstep';
import Loading from './loading';
import Result from './result';
import Fail from './fail';


class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 'intro',
        }
    }
    changePage(step, obj) {
        if (obj) {
            this.setState({
                step: step,
                name: obj.name,
                userName: obj.userName,
                country: obj.country,
                age: obj.age,
            }); 
        } else {
            this.setState({
                step: step,
            });
        }
       
    }
    render() {
        const { step } = this.state;
        let children = null;
        if (step === 'intro') {
            children = <Intro next={this.changePage.bind(this, 'firstStep')} />
        }
        if (step === 'firstStep') {
            children = <FirstStep 
            next={this.changePage.bind(this, 'secondStep')} 
            test="test"/>
        }
        if (step === 'secondStep') {
            children = <SecondStep 
            next={this.changePage.bind(this)} 
            firstStepState={this.state} />
        }
        if (step === 'loading') {
            children = <Loading next={this.changePage.bind(this)} />
        }
        if (step === 'result') {
            children = <Result next={this.changePage.bind(this)} />
        }
        if (step === 'fail') {
            children = <Fail next={this.changePage.bind(this)} />
        }
        return (
            <div id="main">
                {children}
            </div>
        )
    }
}



window.render = function render() {
    ReactDOM.render((
        <MainPage />
        ), document.getElementById('root'));
}
render();