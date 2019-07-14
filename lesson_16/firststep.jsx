import React from 'react';
import Input from './input';

export default class FirstStep extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    setUserName(key, value) {        
        if (key === "userName"){
            this.setState({userName: value});
            if (value.length < 3) {
                this.setState({borderColorUN: "red"})
            } else if (value.length === 0) {
                this.setState({borderColorUN: "white"})
            } else {
                this.setState({borderColorUN: "green"})
            }            
        } else if (key === "name"){
            this.setState({name: value})
            if (value.length < 3) {
                this.setState({borderColorN: "red"})
            } else if (value.length === 0) {
                this.setState({borderColorN: "white"})
            } else {
                this.setState({borderColorN: "green"})
            }
        } else if (key === 'country') {
            this.setState({country: value})
        } else if (key === 'age') {
            this.setState({age: value})
        }
    }
    firstClick() {
        fetch(`https://authserver.worldthirteen.now.sh/check_username?username=${this.state.userName}`,
        {
            method: 'GET',
        }
        )
            .then( res => res.json())
            .then(res => {
                if (res.status === 'CONFLICT' || this.state.userName === undefined || this.state.userName.length < 3){                    
                    this.setState({
                        borderColorUN: 'red',
                    })                    
                } else {
                    this.setState({
                        borderColorUN: 'white',                       
                    })                    
                    this.props.next({
                        userName: this.state.userName,
                        name: this.state.name,
                        country: this.state.country,
                        age: this.state.age,
                    });                    
                }
            })
            .catch(err => console.log(err))
    }               
    
    render() {
        
        return (
            <div id="firstStep">
                <div id="Logo2"></div>
                <h1 id="head2">Welcome</h1>
                <p>Create your account to get started. After that, you can share books and make friends.</p>
                <Input 
                    type="text" 
                    name="name"
                    func={this.setUserName.bind(this)}
                    borderColor={this.state.borderColorN} />
                <Input 
                    type="text"
                    func={this.setUserName.bind(this)} 
                    name="userName" 
                    borderColor={this.state.borderColorUN} />
                <Input 
                    type="text" 
                    name="country" 
                    func={this.setUserName.bind(this)}/>
                <Input 
                    type="number" 
                    name="age"
                    func={this.setUserName.bind(this)}/>
                <button id="buttonNext" onClick={this.firstClick.bind(this)}>Next step</button>
                <p id="firstBottom">Already have an account? <a href="#">Login</a></p>
            </div>
        );
    }

}