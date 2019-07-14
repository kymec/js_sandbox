import React from 'react';
import Input from './input';
import Isemail from 'isemail';
import PasswordValidator from 'password-validator';
import Loading from './loading';

export default class SecondStep extends React.Component {
    constructor() {
        super();
        this.state = {
            buttonSignUp: true,
            displayLoading: 'none',
            displaySecondStep: 'block',
        };
    }

    setData(key, value){
        if (key === "email") {
            this.setState({
                email: value,
            });
            if (value ==='') {
                this.setState({
                    emailColor: 'white',
                    buttonSignUp: true,
                });
            } else if (Isemail.validate(value)){
                this.setState({
                    emailColor: 'green',
                    emailValidated: true,
                    buttonSignUp: true,
                });
            } else {
                this.setState({
                    emailColor: 'red',
                    buttonSignUp: false,
                });
            }
        } else if (key === "password") {
            this.setState({
                password: value,
            });
            let password = new PasswordValidator();
            password
            .is().min(6)
            .is().max(100)
            .has().digits(); 
            
            if (value === '') {
                this.setState({
                    passwordColor: 'white',
                    buttonSignUp: true,
                });
            } else if(password.validate(value)) {
                this.setState({
                    passwordColor: 'green',
                    buttonSignUp: true,
                })
            } else {
                this.setState({
                    passwordColor: 'red',
                    buttonSignUp: true,
                });
            }
            if (value !== this.state,password_2 && this.state.password_2 !== undefined) {
                this.setState({
                    password_2Color: 'red',
                    passwordValidate: false,
                    buttonSignUp: true,
                })
            }    
        } else if (key === "password_2") {
            this.setState({
                password_2: value,
            });
            if (this.state.password === value) {
                this.setState({
                    password_2Color: 'green',
                });
                if (this.state.emailValidated) {
                    this.setState({buttonSignUp: false});
                }                
            } else if (value === '') {
                this.setState({
                    password_2Color: 'white',
                    buttonSignUp: true,
                })
            } else {
                this.setState({
                    password_2Color: 'red',
                    buttonSignUp: true,
                })
            }            
        }
        
   
    }
    signUp() {
        this.setState({
            displayLoading: 'block',
            displaySecondStep: 'none',
        })
        let obj = {
            name: this.props.firstStepState.name,
            username: this.props.firstStepState.userName,
            email: this.state.email,
            password: this.state.password,
            country: this.props.firstStepState.country,
            age: +this.props.firstStepState.age,
        };        
        fetch('https://authserver.worldthirteen.now.sh/register', {
            method: 'POST',
            headers: {
            },
            body: JSON.stringify(obj),
        })
        .then(res => res.json())
        .then(res => {
            this.props.next('result');            
        })
        .catch(err => {
            this.props.next('fail');
        });
    }
    render() {
        return (
            <div>
                <Loading display={this.state.displayLoading} />
                <div id="secondStep" style={{display: `${this.state.displaySecondStep}`}}>                
                    <div id="Logo2"></div>
                    <h1 id="head2">Welcome</h1>
                    <p>Create your account to get started. After that, you can share books and make friends.</p>
                    <Input 
                        type="email" 
                        name="email"
                        func={this.setData.bind(this)}
                        borderColor={this.state.emailColor} />
                    <Input 
                        type="password"
                        name="password" 
                        func={this.setData.bind(this)}
                        borderColor={this.state.passwordColor} />
                    <Input 
                        type="password" 
                        name="password_2"
                        func={this.setData.bind(this)}
                        borderColor={this.state.password_2Color} />
                    <button 
                        id="buttonSignUp" 
                        onClick={this.signUp.bind(this)}
                        disabled={this.state.buttonSignUp}
                    >
                        Sign UP
                    </button>
                    <p id="firstBottom">Already have an account? <a href="#">Login</a></p>
                </div>
            </div>
        );
    
    }

}