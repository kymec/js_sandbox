import React from 'react';
import ReactDOM from 'react-dom';

function User ({firstName, lastName, age, children}) {
    const addition = children
        ? <div style={{border: "1px dashed red"}}>{children}</div>
        : null;

    return (
        <div style={{ border: `${Math.random() * 5}px solid black`, marginTop: '15px', padding: '5px' }}>
            <span>{firstName}</span>
            <span>{lastName}</span>
            <div>He(she) is {age} years old</div>
            {addition}
            
        </div>
    )
}

function Circle({color, children}) {
    const addition = children
    return (        
        <div id="circle" style={{backgroundColor: `${color}`}}>
            {addition}
        </div>
        )
}

function Rect({color, children}) {
    const addition = children
    return (        
        <div id="rect" style={{backgroundColor: `${color}`}}>
            {addition}
        </div>
        )
}

function Address({country, city, street, location}){
    return (
        <address>
            <div>{country}</div>
            <div>{city}</div>
            <div>{street}</div>
            <a href={`https://www.google.com/maps/@${location.lat},${location.lng},18z`}>Location</a>
        </address>
    )
}

function Header() {
    return (
        <header>
            <h1>A-level</h1>
        </header>
    )
}

function Aside() {
    return (
        <aside>
            <Circle color="green" children="Circle text"></Circle>
            <Rect color="red" children="Rect text"></Rect>
        </aside>
    )
}

function Content() {
    return (
        <div id="content">
            <User firstName="Ivan" lastName="Vanovsky" age={29}>
            Some additional information
            </User>
            <User firstName="Denis" lastName="Mazalov" age={26}>
            <span>There is some image:</span><br/>
            <img src="https://s.dou.ua/CACHE/images/img/static/companies/logo_YiWkO4d/e04ab70f372964a85f0e5b10c12aaa6a.png"></img>
            </User>
            <User firstName="Vlad" lastName="Ovgorsky" age={65}></User>
        </div>
    )
}



function Footer() {
    return (
        <footer>
            <Address country="UA" city="Poltava" street="Mira" location={{lat:49.5894247, lng:34.550944}}></Address>           
        </footer>
    )
}



window.render = function render() {
    ReactDOM.render((
        <div>
            <Header></Header>
            <Aside></Aside>
            <Content></Content>
            <Footer></Footer>
        </div>
        ), document.getElementById('root'));
}
render();