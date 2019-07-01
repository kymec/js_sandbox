const ulList = document.getElementById('list');
const input = document.getElementById('input');
loadList();
input.addEventListener("keypress", (event) => {
    if (event.keyCode === 13){
        addItem(input.value);
        input.value = '';
    }
});


function getObj() {
    try {
        obj = JSON.parse(localStorage.getItem('list'));
        if (obj === null){
            obj = [];
        }
        return  obj;
    } catch(e){
        console.log(e, "ошибка получения обьекта");
        
    }
    
}

function setObj(obj) {
    try {
        localStorage.setItem('list', JSON.stringify(obj))
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
        const listObj = getObj();
        if (listObj !== null){
            for (let i = 0; i < listObj.length; i += 1)
            {
                const liItem = document.createElement('li');
                const chItem = document.createElement('input');
                const text = document.createElement('div');
                const remove = document.createElement('div');
                remove.innerHTML = "x";
                remove.style.paddingLeft = "10px";
                remove.style.cursor = "pointer";
                remove.addEventListener("click", () => {
                    removeItem(i);
                })
                chItem.type = "checkbox";
                chItem.addEventListener("click", () => {
                    checked(i);
                    loadList();
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
        
    } catch(e){
        console.log(e, "ошибка загрузки");
    }      
}

function addItem(itemText) {
    try{        
        const listObj = getObj();
        listObj.push({"text": itemText, "checked": "false"});
        localStorage.setItem('list', JSON.stringify(listObj));
        loadList();        
    } catch(e){
        console.log(e, "ошибка добавления");        
    }
    
}

function checked(i) {
    try{
        const listObj = getObj();
        if (listObj[i]["checked"] === "true"){
            listObj[i]["checked"] = "false"
        } else {
            listObj[i]["checked"] = "true";
        }
        setObj(listObj);        
        //loadList();
    } catch(e){
        console.log(e, "ошибка установки флага");        
    }    
}

function removeItem(i) {
    obj = getObj();
    obj.splice(i, 1);
    setObj(obj);
    loadList();
}



window.loadList = loadList;
window.addItem = addItem;
window.checked = checked;