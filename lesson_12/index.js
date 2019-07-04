const SECRET_KEY = '$2a$10$lJeKuVMxF.hCVvYH2mdsauTE6K9W/B2aeXrwRAZclAfCXna41vl/6';
const bin_id = '5d1ce7e3f467d60d75acc67a';
const binRadio = document.getElementById("binRadio");
const binRadio2 = document.getElementById("binRadio2");
jsbin = JSON.parse(localStorage.getItem('jsbin'));
let obj;
let listObj;

const ulList = document.getElementById('list');
const input = document.getElementById('input');



if (jsbin === undefined || jsbin === null){
    jsbin = false;
    localStorage.setItem('jsbin', JSON.stringify("false"));
}


if (jsbin === 'true'){    
    binRadio.checked = true;
    binRadio2.checked = false;
} else {
    binRadio.checked = false;
    binRadio2.checked = true;
}

loadList();

binRadio.addEventListener("change", () => {
    if (binRadio.checked){
        localStorage.setItem('jsbin', JSON.stringify("true"));
        jsbin = 'true';
        loadList();
    } else {
        localStorage.setItem('jsbin', JSON.stringify("false"));
        jsbin = 'false';
        loadList();
    }    
})
binRadio2.addEventListener("change", () => {  
    if (binRadio2.checked){
        localStorage.setItem('jsbin', JSON.stringify("false"));
        jsbin = 'false';
        loadList();
    } else {
        localStorage.setItem('jsbin', JSON.stringify("true"));
        jsbin = 'true';
        loadList();
    }    
})

input.addEventListener("keypress", (event) => {
    if (event.keyCode === 13){
        addItem(input.value);
        input.value = '';
    }
});

function getObj() {
    try {
        if (jsbin === 'false'){            
            return new Promise ((res, rej) => {
                obj = JSON.parse(localStorage.getItem('list'));
                res(obj);
                
            });
        } else {            
            return fetch (`https://api.jsonbin.io/b/${bin_id}/latest`, {
                method: 'GET',
                headers: {
                    'secret-key': SECRET_KEY,
                },
            })
            .then(response => response.json())
            .then(response => {                
                obj = response;                                
            });                  
            
        }
    } catch(e){
        console.log(e, "ошибка получения обьекта");        
    }    
}

function setObj(obj) {
    try {
        if (jsbin === 'false'){
            return new Promise ((res, rej) => {
                localStorage.setItem('list', JSON.stringify(obj));
                res();                               
            });
            
        } else {
                return fetch (`https://api.jsonbin.io/b/${bin_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'secret-key': SECRET_KEY,
                    },        
                    body: JSON.stringify(obj),
                });            
        }
    } catch(e){
        console.log(e, "ошибка установки значения");        
    }    
}

function loadList() {
    try {
        let k = ulList.children.length;
        for (let i = 0; i < k; i += 1){
            ulList.children[0].remove(); 
        }        

        getObj()
            .then(res => {
                listObj = obj;
                
                if (listObj !== null){
                    for (let i = 0; i < listObj.length; i += 1)
                    {
                        const liItem = document.createElement('li');
                        liItem.className = "li";
                        const chItem = document.createElement('input');
                        const text = document.createElement('div');
                        const remove = document.createElement('img');
                        remove.src = "./close.png";
                        remove.addEventListener("click", () => {
                            removeItem(i, listObj);
                        })
                        chItem.type = "checkbox";
                        chItem.className = "checkbox";
                        chItem.addEventListener("click", () => {
                            checked(i)
                            .then(res => loadList())
                        })     
                        liItem.append(chItem);
                        if (listObj[i]["checked"] === "true"){
                            chItem.checked = true;
                        } else chItem.checked = false;                            
                        liItem.append(text);
                        text.innerHTML = listObj[i]["text"];
                        liItem.append(remove);
                        ulList.append(liItem);
                        if (listObj[i]["checked"] === "true") {
                            text.style.textDecoration = 'line-through';
                            text.style.color = "grey";
                        } else {
                            text.style.textDecoration = 'none';
                            text.style.color = "black";
                        }            
                    }  
                } else {
                    console.log("обьект пустой, сначала добавьте в него елементы");
                    
                }
            })        
    } catch(e){
        console.log(e, "ошибка загрузки");
    }      
}

function addItem(itemText) {
    try{        
        getObj().then(res => {            
            listObj = obj;            
            listObj.push({"text": itemText, "checked": "false"});
            if (jsbin === 'false'){
                localStorage.setItem('list', JSON.stringify(listObj));
                loadList();
                
            } else {
                fetch (`https://api.jsonbin.io/b/${bin_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'secret-key': SECRET_KEY,
                    },        
                    body: JSON.stringify(listObj),
                })
                .then(res => loadList())        
            }
        });
                
    } catch(e){
        console.log(e, "ошибка добавления");        
    }
    
}

function checked(i) {
    try{
        getObj()
            .then(res => listObj = res);
        if (listObj[i]["checked"] === "true"){
            listObj[i]["checked"] = "false"
        } else {
            listObj[i]["checked"] = "true";
        }        
        return setObj(listObj); 
    } catch(e){
        console.log(e, "ошибка установки флага");        
    }    
}

function removeItem(i, obj) {
    obj.splice(i, 1);
    setObj(obj)
    .then(res => loadList() )
       
}

const check = document.getElementById("checkAll");
check.addEventListener('click', () => checkAll());

function checkAll() {    
    getObj().then(res => listObj = res);
    let checkStatus;    
    if (listObj[0]["checked"] === "true"){
        checkStatus = true;
    } else {
        checkStatus = false;
    }
    for (let i = 0; i < listObj.length; i += 1){
        if (checkStatus){
            listObj[i]["checked"] = "false"
        } else {
            listObj[i]["checked"] = "true";
        }
    }
    setObj(listObj)
    .then(res => loadList())
    
}

const all = document.getElementById('all');
const active = document.getElementById('active');
const completed = document.getElementById('completed');
const liList = document.getElementsByClassName('li');
const checkbox = document.getElementsByClassName('checkbox');

all.addEventListener('click', () => {
    for (let i = 0; i < liList.length; i += 1){
        liList[i].style.display = "list-item";
    }
    all.style.border = "1px solid grey";
    all.style.borderRadius = "3px";
    active.style.border = "none";
    completed.style.border = "none";
});

active.addEventListener('click', () => {
    for (let i = 0; i < liList.length; i += 1){
        if (checkbox[i].checked === false){
            liList[i].style.display = "list-item";
        } else {
            liList[i].style.display = "none";
        }        
    }
    active.style.border = "1px solid grey";
    active.style.borderRadius = "3px";
    all.style.border = "none";
    completed.style.border = "none";
});

completed.addEventListener('click', () => {
    for (let i = 0; i < liList.length; i += 1){
        if (checkbox[i].checked === true){
            liList[i].style.display = "list-item";
        } else {
            liList[i].style.display = "none";
        }        
    }
    completed.style.border = "1px solid grey";
    completed.style.borderRadius = "3px";
    active.style.border = "none";
    all.style.border = "none";
});


window.loadList = loadList;
window.addItem = addItem;
window.checked = checked;
window.getObj = getObj;