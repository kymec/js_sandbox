const from = document.getElementById('from');
const to = document.getElementById('to');
const selectTo = document.getElementById('selectTo');
const selectFrom = document.getElementById('selectFrom');
const result = document.getElementById('result');
const arrow = document.getElementById('arrow');
const periodCur1 = document.getElementById('periodCur1');
const periodCur2 = document.getElementById('periodCur2');
const list = document.getElementById('list');

let currency;
let fromTo;

//arrow click
arrow.addEventListener("click", () => {
    let str3 = selectFrom.value;
    selectFrom.value =  selectTo.value;
    selectTo.value = str3;
})

//deactivation another input
function fromActive() {
    to.readOnly = true;
    to.style.backgroundColor = "lightgrey";
    to.value = "";
    from.readOnly = false;
    from.style.backgroundColor = "white";
    result.innerHTML = '';
    fromTo = true;
}
function toActive() {
    from.readOnly = true;
    from.style.backgroundColor = "lightgrey";
    from.value = "";
    to.readOnly = false;
    to.style.backgroundColor = "white";
    result.innerHTML = '';
    fromTo = false;
    
}
from.addEventListener("focus", fromActive);
to.addEventListener("focus", toActive);

//функция подсчёта
function calc(){
    if (selectFrom.value == selectTo.value){
        result.innerHTML = "Выберите разные валюты"
        result.style.color = "red";
        return;
    }
    result.style.color = "darkblue";
    let str1, str2;
    if (fromTo){
        str1 = selectFrom.value;
        str2 = selectTo.value;
    } else {
        str1 = selectTo.value;
        str2 = selectFrom.value;
    }
    fetch(`https://api.exchangeratesapi.io/latest?base=${str1}`, {method:"GET"})
    .then(res => res.json())
    .then(res => {
        if (this.value !== ''){
            result.innerHTML = this.value * res.rates[`${str2}`];
        } else{
            result.innerHTML = '';
        }
    })
    .catch(() => {
        result.innerHTML = 'Не удалось получить данные с сервера';
        result.style.color = "red";        
    });    
}
from.addEventListener("change", calc);
to.addEventListener("change", calc);
from.addEventListener("keyup", calc);
to.addEventListener("keyup", calc);

const button = document.getElementById('button');
const periodSelect = document.getElementById('periodSelect');
const dateFrom = document.getElementById('dateFrom');
const dateTo = document.getElementById('dateTo');

button.addEventListener("click", () => {
    for (let i = 0; i < list.children.length * 4; i += 1){
        list.children[0].remove();
    }
    if (dateFrom.value === "" || dateTo.value === ""){
        result.innerHTML = 'дата не может быть пустой';
        result.style.color = "red";
        return;
    }
    let date = new Date();
    let dateStr = [];
    if(dateFrom.value >= dateTo.value){
        result.innerHTML = 'дата c: не может быть больше даты по:';
        result.style.color = "red";
        return;
    }
    dateStr = dateTo.value.split('-');
    if (dateStr[0] > date.getFullYear() || (dateStr[0] == date.getFullYear() && dateStr[1] > date.getMonth() + 1) || (dateStr[0] == date.getFullYear() && dateStr[1] == date.getMonth() + 1 && dateStr[2] > date.getDate())){
        result.innerHTML = 'дата по: не может быть больше текущей';
        result.style.color = "red";        
        return;
    }
    if (periodCur1.value == periodCur2.value){
        result.innerHTML = "Выберите разные валюты"
        result.style.color = "red";
        return;
    }
    result.innerHTML = '';
    result.style.color = "darkblue";    
    button.disabled = true;
    fetch(`https://api.exchangeratesapi.io/history?base=${periodCur1.value}&start_at=${dateFrom.value}&end_at=${dateTo.value}`, {method:"GET"})
    .then(res => res.json())
    .then(res => {
        for (let value in res.rates){
            const div = document.createElement('div');
            list.appendChild(div);             
            const div1 = document.createElement('div');
            div.appendChild(div1);   
            const div2 = document.createElement('div');
            div.appendChild(div2); 
            const div3 = document.createElement('div');
            div.appendChild(div3);  
            div1.className = "listDiv";
            div2.className = "listDiv";
            div3.className = "listDiv";      
            let str = res.rates[`${value}`][`${periodCur2.value}`];            
            div1.innerHTML = `${value}`;
            div2.innerHTML = `${periodCur1.value}/${periodCur2.value}`;
            div3.innerHTML = `${str}`;
        }
        button.disabled = false;
    });

});





