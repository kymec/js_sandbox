import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, Prompt} from 'react-router-dom';
import '/style.css';
import Isemail from 'isemail';

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            error: '',
            islogin: false,
            buttonDisabled: true,
            border: '2px inset #FFFFFF',
            hide: 'block',
            resSrc: '',
            resName: '',
            showReact: 'none',
        }
    }
    header() {
        return <h1>your art museum</h1>
    }
    address() {
        return <address style={{display: `${this.state.hide}`}}>151 3rd <br />St San Francisco, CA 94103</address>
    }
    onChangeEmail(change) {
        if (!Isemail.validate(change.target.value)) {
            this.setState({
                error: 'invalid email address',
                buttonDisabled: true,
                border: '2px solid #FF473A',
            });
        }
        else {
            this.setState({
                error: '',          
                buttonDisabled: false, 
                border: '2px inset #FFFFFF',              
            });
        }
        this.setState({
            email: change.target.value,  
        })
    }
    onChangePassword(change) {
        this.setState({password: change.target.value})
    }
    onClick() {
        buttonDisabled: true;
        fetch('https://authserver.worldthirteen.now.sh/login',
        {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }
        )
            .then( res => res.json())
            .then(res => {
                if(res.error) {
                    this.setState({error: res.error})
                } else {
                    this.setState({
                    islogin: true,
                    hide: 'none',
                    buttonDisabled: false,
                    showReact: 'block',
                    resSrc: res.avatar,
                    resName: res.name,
                });
                }                
            })
            .catch(err => {
                this.setState({error: err.error});
            });
    }
    form() {
        return (
            <div id="form" style={{display: `${this.state.hide}`}}>
                <input 
                    id="login" 
                    onChange={this.onChangeEmail.bind(this)}
                    type="email" 
                    placeholder="Email address"
                    style={{border: `${this.state.border}`}}
                ></input>
                <input 
                    id="password" 
                    onChange={this.onChangePassword.bind(this)} 
                    type="password"
                    placeholder="Password"
                ></input>
                <a href="#" id="forgot">Forgot your password?</a>
                <button 
                    id="button" 
                    onClick={this.onClick.bind(this)}
                    disabled={this.state.buttonDisabled}
                ><div>Log in</div></button>
                <a href="signup" id="dont">Don't have an account</a>
            </div>
        );
    }
    error() {       
        return (
            <div id="error">
                {this.state.error}
            </div>
        );
    }
    react(){
        return (
            <div style={{ display: `${this.state.showReact}` }}>
                <img id="img" src={this.state.resSrc}></img>
                <div id="react">Welcome back, 
                    <span> {this.state.resName}</span>
                </div>
                <Link to="/"><button id="buttonApp">Go to App</button></Link>
            </div>
        );
    }
    login() {
        
        return (
            <div  id="main">
                {this.header()}
                {this.address()}
                {this.error()}
                {this.form()}
                {this.react()}            
            </div>
        );
    }
    signup() {
        return (
            <div>
                <h1>Sorry...</h1>
                <Link to="/login"><button id="buttonBack">Back to login</button></Link>
            </div>
        );
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" exact component={() => this.login() } />
                    <Route path="/signup" component={() => this.signup()} />
                    <Redirect from="/" to="/login" />               
                </Switch>
            </Router>
        );
    }
}

window.render = function render() {
    ReactDOM.render((
        <div>
            <MainPage />
        </div>
        ), document.getElementById('root'));
}

render();