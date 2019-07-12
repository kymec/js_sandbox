import React from 'react';

export default class SecondPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            secondPage: 'block',
            borderColor: 'grey',
            userName: '',
        };
    }
    onChangeUser(change) {
        this.setState({userName: change.target.value})
    }
    secondClick() {
        fetch(`https://authserver.worldthirteen.now.sh/check_username?username=${this.state.userName}`,
        {
            method: 'GET',
        }
        )
            .then( res => res.json())
            .then(res => {
                if (res.status === 'CONFLICT' || this.state.userName.length < 2){
                    this.setState({
                        borderColor: 'red',
                    })                    
                } else {
                    this.setState({
                        borderColor: 'grey',                        
                    })                    
                    console.log('redirect to next page');
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        
        if (this.props.pageShow === 'secondPage'){
            console.log(this.props.pageShow);
            this.setState({
                intro: 'none',
                secondPage: 'block',
                thirdPage: 'none',
                result: 'none',
            });
        }
        return (
            <div  
                id="mainSecond"
                style={{display: `${this.state.secondPage}`}}
            >
                <div id="Logo2"></div>
                <h1 id="head2">Welcome</h1>
                <div id="description2">Create your account to get started. After that, you can share books and make friends.</div>
                <div>Name</div>
                <input id='name'></input>
                <div>Username</div>
                <input 
                    id='username' 
                    style={{borderBottom: `2px solid ${this.state.borderColor}`}}
                    onChange={this.onChangeUser.bind(this)}
                ></input>
                <div>Country</div>
                <input id='country'></input>
                <div>Age</div>
                <input id='age'></input>

                
                <div onClick={this.secondClick.bind(this)} id="buttonNext">Next Step</div>
            </div>
        );
    }
}