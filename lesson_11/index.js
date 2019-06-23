//Часть 1
const div = document.createElement('div');
document.body.append(div)
div.style.cursor = "pointer";
div.innerHTML = 'Нажмите здесь для получения данных об местоположении';
//слушаем клик по надписи
div.addEventListener('click', () => {
    foundIp()
    .then(res => look(res['ip']))
    .then(res => {
        div.innerHTML = `${res['data']['country']} ${res['data']['city']}`;
    });
    
})
//функция поиска нашего айпи
function foundIp() {
    const promiseIp1 = fetch('https://api.ipify.org?format=json');
    const promiseIp2 = fetch('https://ipapi.co/json/');
    const promiseIp3 = fetch('http://free.ipwhois.io/json/');
    return Promise.race([promiseIp1, promiseIp2, promiseIp3])
        .then(res => {
            div.innerHTML = "выполняется поиск";
            return res.json();
        })
        .catch(err => {
            div.innerHTML = "ошибка получения ip";
        });
}
//функция поиска данных по айпи
function look(ipStr) {
    return fetch(`https://api.jsonbin.io/g/${ipStr}`, {method: 'GET'})
        .then(res => res.json())
        .catch(err => {
            div.innerHTML = "ошибка получения локации";
        });     
}

//Часть 2
const SECRET_KEY = '$2a$10$lJeKuVMxF.hCVvYH2mdsauTE6K9W/B2aeXrwRAZclAfCXna41vl/6';
const bin_id = '5d0e9a744788e310f6cd81c8';
//функции с урока для работы с BIN
function postData(data) {
    return fetch ('https://api.jsonbin.io/b', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'secret-key': SECRET_KEY,
            'private': 'true',
        },
        body: JSON.stringify(data),
    });
}
window.postData = postData;

function getData(id) {
    return fetch (`https://api.jsonbin.io/b/${id}/latest`, {
        method: 'GET',
        headers: {
            'secret-key': SECRET_KEY,
        },
    })
    .then(response => response.json());
}
window.getData = getData;

function updateData(id, data) {
    return fetch (`https://api.jsonbin.io/b/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'secret-key': SECRET_KEY,
        },        
        body: JSON.stringify(data),
    });
}
window.updateData = updateData;

function deleteData(id) {
    return fetch (`https://api.jsonbin.io/b/${id}`, {
        method: 'DELETE',
        headers: {
            'secret-key': SECRET_KEY,
        },
    });
}
window.deleteData = deleteData;

//создаём элементы HTML
const divPart2 = document.createElement('div');
document.body.append(divPart2);
const input = document.createElement('input');
input.type = 'text';
divPart2.append(input);
const button = document.createElement('button');
button.innerHTML = 'Добавить';
divPart2.append(button);
const message = document.createElement('div');
divPart2.append(message);
const ol = document.createElement('ol');
divPart2.append(ol);
//функция загрузки списка
function listLoad(){    
    button.disabled = true;
    let k = ol.children.length;
    for (let i = 0; i < k; i += 1){
        ol.children[0].remove();        
    }
    getData(`${bin_id}`)
        .then(res => {
            for (let i = 0; i < res.list.length; i += 1){
                const li = document.createElement('li');
                const img = document.createElement('img');
                img.id = `${i}`;
                li.innerHTML = res.list[i];
                img.src = 'https://png.pngtree.com/svg/20160103/trash_543127.png';
                ol.append(li);
                li.append(img);
                //при клике на корзину удаляем елемент
                img.addEventListener('click', (event) => {
                    getData(`${bin_id}`)
                    .then(res => {
                        arr = res.list;
                        arr.splice(`${event.path[0].id}`, 1);
                        return updateData(`${bin_id}`, {list: arr});                              
                    })
                    .then(res => listLoad());
                });
            }
            button.disabled = false;
        });
}
//загрузка списка
listLoad();

//при клике на кнопку добавляем елемент
button.addEventListener('click', () => {
    message.innerHTML = '';
    let arr;
    if(input.value !== ''){
        getData(`${bin_id}`)
            .then(res => {
                arr = res.list;
                arr.push(input.value);
                input.value = '';
                return updateData(`${bin_id}`, {list: arr});                              
            })
            .then(res => listLoad());
    } else{
        message.innerHTML = 'Нельзя добавить пустую строку';
    }    
    
})