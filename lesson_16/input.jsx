import React from 'react';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: this.props.validated || false,
            borderColor: this.props.borderColor,
            type: this.props.type,
        }
    }
    onChange(change) {
        if (this.props.func) {
            this.props.func(this.props.name, change.target.value);
        }
        
    }
    render() {
        
        let inputText;
        if (this.props.name === "password_2") {
            inputText = "type password again";
        } else {
            inputText = this.props.name;
        }
        
        return (
            <div>
                <div className="inputText">{inputText}</div>
                <input
                    type={this.state.type}
                    min="0"
                    className="input" 
                    id={this.props.name}
                    style={{borderBottom: `2px solid ${this.props.borderColor}`}}
                    onChange={this.onChange.bind(this)}
                >
                </input>
            </div>
        );
    }
}