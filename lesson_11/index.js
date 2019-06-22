const div = document.createElement('div');
document.body.append(div)
div.style.cursor = "pointer";
div.innerHTML = 'Нажмите здесь для получения данных об местоположении';

div.addEventListener('click', () => {
    foundIp()
    .then(res => look(res['ip']))
    .then(res => {
        div.innerHTML = `${res['data']['country']} ${res['data']['city']}`;
    });
    
})

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
function look(ipStr) {
    return fetch(`https://api.jsonbin.io/g/${ipStr}`, {method: 'GET'})
        .then(res => res.json())
        .catch(err => {
            div.innerHTML = "ошибка получения локации";
        });     
}