import React from 'react';

export default class Timer extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            startState: false,
            pauseState: true,
            stopState: true,
        }
    }
    start() {
        this.setState({
            startState: true,
            stopState: false,
            pauseState: false,
        })
        this.state.intervalId = setInterval(() => {
            this.setState({
                count: this.state.count + 1,
            })
        },
        1000);
    }
    pause() {
        clearInterval(this.state.intervalId);
        this.setState({
            startState: false,
            pauseState: true,
            stopState: true,
        });
    }
    stop() {
        clearInterval(this.state.intervalId);
        this.setState({
            count: 0,
            startState: false,
            pauseState: true,
            stopState: true,
        });
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    render() {
        return ( 
            <div  id="timer">
                <button disabled={this.state.startState} onClick={this.start.bind(this)}>Start</button>
                <button disabled={this.state.pauseState} onClick={this.pause.bind(this)}>Pause</button>
                <button disabled={this.state.stopState} onClick={this.stop.bind(this)}>Stop</button>
                <div>{this.state.count}</div>
            </div>
        )
    }
    
}