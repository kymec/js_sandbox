import React from 'react';

export default class Loading extends React.Component {
    constructor(){
        super();
    }
    render() {        
        return (
            <div style={{display: `${this.props.display}`}}>Loading</div>
        );
    }
}