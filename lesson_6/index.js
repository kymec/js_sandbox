import randomEmail from 'random-email';
import emailValidator from 'email-validator'; 
import formatValidator from 'format-validator';

const generate = document.getElementById('generate');
const popup = document.getElementById('popup');
const popupEmail = document.getElementById('popupEmail');
const close = document.getElementById('close');

generate.addEventListener("click", (event) => {    
    popup.style.display = "block";
    popupEmail.innerHTML = `${randomEmail({domain: 'alevel.com'})}`;
    generate.style.display = "none";
});
close.addEventListener("click", (event) => {
    generate.style.display = "block";
    popup.style.display = "none";
});

const input = document.getElementById('input');

input.addEventListener("change", (event) => {
    if(input.value === ""){
        input.style.border = "2px solid grey";
    }else if(emailValidator.validate(input.value) === true){
        input.style.border = "2px solid green";
    } else if(emailValidator.validate(input.value) === false){
        input.style.border = "2px solid red";
    }
});


//Задание 3
const check = document.getElementById('check');
const popupCheck = document.getElementById('popupCheck');
const popupTypes = document.getElementById('popupTypes');
const closeCheck = document.getElementById('closeCheck');
const inputFormat = document.getElementById('inputFormat');
let format = [];
let str = "";

for (let key in formatValidator) {
    if (key[0] === "i" && key[1] === "s"){
        format.push(key);
    }
}
check.addEventListener("click", (event) => { 
    for (let i = 0; i < format.length; i += 1){
        if (format[i] !== "isDate" && format[i] !== "isTrashEmail" && format[i] !== "isValid"){
            if(formatValidator[format[i]](inputFormat.value)){
                for (let j = 2; j < format[i].length; j += 1){
                    str += format[i].charAt(j);
                }
                str += ", "          
            }
        } 
    }
    str = str.slice(0, str.length - 2);
    popupCheck.style.display = "block";
    popupTypes.innerHTML = str;
    check.style.display = "none";
});
closeCheck.addEventListener("click", (event) => {
    check.style.display = "block";
    popupCheck.style.display = "none";
    str = "";
});





