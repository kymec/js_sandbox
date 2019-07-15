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
                <svg className="stepBall1" width="242" height="160" viewBox="0 0 242 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="92.5" cy="10.5" r="149.5" fill="url(#paint6_linear)" fill-opacity="0.61"/>
                <defs>
                <linearGradient id="paint6_linear" x1="242" y1="143" x2="-191.5" y2="-290.5" gradientUnits="userSpaceOnUse">
                <stop offset="0.00452904" stop-color="white"/>
                <stop offset="0.626054" stop-color="#79ABFC"/>
                <stop offset="1" stop-color="#606CFF"/>
                </linearGradient>
                </defs>
                </svg>
                <svg className="stepBall2" width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="68" cy="68" r="68" fill="url(#paint7_linear)"/>
                <defs>
                <linearGradient id="paint7_linear" x1="56.5" y1="18.5" x2="151.6" y2="167.6" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FEB665"/>
                <stop offset="1" stop-color="#F66EB4"/>
                </linearGradient>
                </defs>
                </svg>
                <svg className="stepBall3" width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="34.3534" cy="34.3533" r="27.8227" transform="rotate(-15.8189 34.3534 34.3533)" fill="url(#paint8_linear)"/>
                <defs>
                <linearGradient id="paint8_linear" x1="82.8428" y1="-10.9001" x2="-12.5757" y2="72.7574" gradientUnits="userSpaceOnUse">
                <stop stop-color="#2DEEF9"/>
                <stop offset="1" stop-color="#E084F1"/>
                </linearGradient>
                </defs>
                </svg>
                <svg className="lamp" width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">                
                <path d="M7.82609 37.5652H1.56522C0.701217 37.5652 0 36.8656 0 36C0 35.1345 0.701217 34.4348 1.56522 34.4348H7.82609C8.69009 34.4348 9.3913 35.1345 9.3913 36C9.3913 36.8656 8.69009 37.5652 7.82609 37.5652Z" fill="white"/>
                <path d="M16.078 17.6431C15.6773 17.6431 15.2766 17.4897 14.9714 17.1844L10.5449 12.7564C9.93294 12.1444 9.93294 11.1552 10.5449 10.5432C11.1569 9.93123 12.1462 9.93123 12.7582 10.5432L17.1846 14.9712C17.7966 15.5832 17.7966 16.5724 17.1846 17.1844C16.8794 17.4912 16.4787 17.6431 16.078 17.6431Z" fill="white"/>
                <path d="M36 9.3913C35.136 9.3913 34.4348 8.69165 34.4348 7.82609V1.56522C34.4348 0.699652 35.136 0 36 0C36.864 0 37.5652 0.699652 37.5652 1.56522V7.82609C37.5652 8.69165 36.864 9.3913 36 9.3913Z" fill="white"/>
                <path d="M55.9221 17.6431C55.5214 17.6431 55.1207 17.4897 54.8154 17.1844C54.2034 16.5724 54.2034 15.5832 54.8154 14.9712L59.2419 10.5432C59.8523 9.93123 60.8431 9.93123 61.4551 10.5432C62.0671 11.1552 62.0671 12.1444 61.4551 12.7564L57.0287 17.1844C56.7234 17.4912 56.3228 17.6431 55.9221 17.6431Z" fill="white"/>
                <path d="M70.4347 37.5652H64.1739C63.3099 37.5652 62.6086 36.8656 62.6086 36C62.6086 35.1345 63.3099 34.4348 64.1739 34.4348H70.4347C71.2987 34.4348 71.9999 35.1345 71.9999 36C71.9999 36.8656 71.2987 37.5652 70.4347 37.5652Z" fill="white"/>
                <path d="M35.9999 15.6521C24.7804 15.6521 15.6521 24.7804 15.6521 35.9999C15.6521 44.2173 20.6404 51.6208 28.1738 54.7637L28.1738 64.1738H43.826V54.7637C51.3594 51.6208 56.3478 44.2173 56.3478 35.9999C56.3478 24.7804 47.2194 15.6521 35.9999 15.6521Z" fill="white"/>                <path d="M32.8695 72.0001H39.1304C41.7239 72.0001 43.826 69.898 43.826 67.3044H28.1738C28.1738 69.898 30.2759 72.0001 32.8695 72.0001Z" fill="white"/>
                </svg>

                <h1 id="head2">Welcome</h1>
                <p id="firstP">Create your account to get started. After that, you can share books and make friends.</p>
                <div id="firstForm">
                    <Input 
                        type="text" 
                        name="name"
                        func={this.setUserName.bind(this)}
                        borderColor={this.state.borderColorN}
                        placeholder='ducawizard@gmail.com' />
                    <Input 
                        type="text"
                        func={this.setUserName.bind(this)} 
                        name="userName" 
                        borderColor={this.state.borderColorUN}
                        placeholder='ducawizard@gmail.com' />
                    <div id="countryAge">
                        <Input 
                            type="text" 
                            name="country" 
                            func={this.setUserName.bind(this)} 
                            placeholder='Romania' />
                        <Input 
                            type="number" 
                            name="age"
                            func={this.setUserName.bind(this)} 
                            placeholder='27' />
                    </div>
                </div>
                <button id="buttonNext" onClick={this.firstClick.bind(this)}>Next step</button>
                <p id="firstBottom">Already have an account? <a href="#">Login</a></p>
            </div>
        );
    }

}