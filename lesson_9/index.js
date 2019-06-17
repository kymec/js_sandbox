//part 1
const div2 = document.createElement('div');
document.body.appendChild(div2);

const div = document.createElement('div');
document.body.appendChild(div);
div.style.height = `${document.documentElement.clientHeight * 2}px`;

function waitForScroll(){
    return new Promise((resolve) => {
        window.addEventListener("scroll", resolve);
    });
}

function drawOnScroll(){
    waitForScroll().then(() => {
        div.style.backgroundColor = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`;
    })
}

//part 2
function waitForAnswer(){
    return new Promise((resolve, reject) => {
        window.addEventListener("keypress", (event) => {
            if(event.key === 'y' || event.key === 'Y'){
                resolve();
            }
            if(event.key === 'n' || event.key === 'N'){
                reject();
            }
        })
    });
}

function setText(text){    
    div2.innerHTML = text;
}
setText("Вы сделали домашнее задание? Y / N");
waitForAnswer().then(() => div2.innerHTML = "Так держать!").catch(() => div2.innerHTML = "Нужно подтянуть(");

//part 3
function waitForTime(sec){
    return new Promise((resolve, reject) => {
        if (sec <= 0 || typeof sec !== 'number' || sec%1 != 0){
            reject('неправильный ввод');
        }
        setTimeout(resolve, sec * 1000, 'seconds');
    });
}

function waitForClicks(clicks){
    return new Promise((resolve, reject) => {
        if (clicks <= 0 || typeof clicks !== 'number' || clicks%1 != 0){
            reject('неправильный ввод');
        }
        let i = 1;
        window.addEventListener("click", () => {
            if(i == clicks){
                resolve('clicks');
            }
            i += 1;
        });        
    });
}

function clickChallange(clicks, seconds){
    setText(`У вас есть ${seconds} секунд, чтобы сделать ${clicks} кликов`);
    let promise1 = waitForClicks(clicks);
    let promise2 = waitForTime(seconds);
    Promise.race([promise1, promise2]).then((value) => {
        if(value === 'seconds'){
            setText('100 кликов вне очереди');
        } else if(value === 'clicks'){
            setText('Good job, comrade');
        }
    });
}

window.waitForScroll = waitForScroll;
window.drawOnScroll = drawOnScroll;
window.waitForAnswer = waitForAnswer;
window.setText = setText;
window.waitForTime = waitForTime;
window.waitForClicks = waitForClicks;
window.clickChallange = clickChallange;