import React from 'react';

export default class CountrySelect extends React.Component {
    constructor() {
        super();
        this.state = {
            country: [
                {}
            ],
            item: 0,
        };
        this.getObj();
    }
    getObj() {
        fetch('https://restcountries.eu/rest/v2/all',{
            method: 'GET',
        })
        .then(response => response.json())
        .then(response => {
            
                this.setState({
                country: response,          
            });
            this.loadList();
        });
    }
    loadList(){
        let result = [];
        for (let i = 0; i < this.state.country.length; i += 1){
            
            result.push(
                <li key={i}>
                {this.state.country[i]['name']}
                    <div><img src={this.state.country[i]['flag']}></img></div>
                </li>)                      
        }
        return result;
    }
    render() {
        return (
            <ul  style={{maxHeight: `${this.props.maxheight}`}}>
                {this.loadList()}
            </ul>
        );
    }
}
