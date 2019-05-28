//Задача 4
function func4(arr){
    let max = -Infinity;
    function sum(arrMin){
        let sumAr = 0;
        for (let s = 0; s < arrMin.length; s += 1){
            sumAr += arrMin[s];
        }
        return sumAr;
    }    
    for(let i = 0; i < arr.length; i +=1){
        for(let k = 0; k < arr.length; k += 1){
            if (sum(arr.slice(k, k + i + 1)) > max){
                max = sum(arr.slice(k, k + i + 1));
            }
        }        
    }
    return max;
}

//Задача 5
function func5(arr){
    let resArr = [];
    function transform(arrCall, callback){
        let item;
        for(let i = 0; i < arrCall.length; i += 1)
        {
            item = arrCall[i];
            if(Object.prototype.toString.call(item) === '[object Array]'){
                transform(item, callback);
            }else{
                callback(item)
            }
        }
    }
    function callback(item){
        resArr.push(item);
    }
    transform(arr, callback);
    return resArr;
}

//Задача 6
const add = (a) => {
    let sum = a;
    const func = (b) => {
        if (b != 3 && b != 6)
        {
            sum += b;
            return func;
        } else{
            return sum +=b;
        }                        
    };
    return func;
}

//Задача 3
function mask(stringValue) {
    let arr = stringValue.split('');
    for (let i = 0; i < arr.length - 4; i += 1){
        arr[i] = '*';
    }
    return arr.join('');
}

//Задача 6
/*
Утебя есть последовательность чисел от 8 до 88. М = [8, 9, 10... 86, 87, 88]. Одно из чисел встречается дважды. Как узнать что это за число?
*/
//Ответ:
/*
//функция поиска повторяющегося числа
function repeat(arr){
    for (let i = 0; i < arr.length; i += 1){
        for (let j = i + 1; (j + 1) < arr.length; j += 1){
            if(arr[i] == arr[j]){
                return arr[i];
            }
        }
    }
    return null;
}

//проверка
let m = [];
for (let i = 8; i <= 88; i += 1){
    m[i - 8] = i;
}
m[18] = 27;

console.log(repeat(m));
*/