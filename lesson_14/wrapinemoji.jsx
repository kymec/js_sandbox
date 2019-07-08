import React from 'react';

export default class WrapInEmoji extends React.Component {
    constructor() {
        super();
        this.state = {
            emojiL: String.fromCodePoint(0x1F601 + Math.round(Math.random() * 36)),
            emojiR: String.fromCodePoint(0x1F601 + Math.round(Math.random() * 36)), 
        }
        this.state.default = true;  
    }

    onEmojiClickLeft() {
        this.setState({
            emojiL: String.fromCodePoint(0x1F601 + Math.round(Math.random() * 36)),
          });
    }

    onEmojiClickRight() {
        this.setState({
            emojiR: String.fromCodePoint(0x1F601 + Math.round(Math.random() * 36)),
          });
    }
    componentDidMount() {
        this.state.default = false;
      }
    render() {
        if(this.props.defaultEmoji && this.state.default) {          
            this.state = {
                emojiL: this.props.defaultEmoji,
                emojiR: this.props.defaultEmoji,  
            };
        }
        return ( 
            <div>
                <span onClick={this.onEmojiClickLeft.bind(this)}>{this.state.emojiL}</span>
                {this.props.children}
                <span onClick={this.onEmojiClickRight.bind(this)}>{this.state.emojiR}</span>
            </div>
        );
    }
    
}