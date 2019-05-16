"use strict"

function removeKeys(obj, arr){
    arr.forEach(element => {
        delete obj[element];
    });
    return obj;
}

function clearNumbers(arr){
    arr.forEach(element => {
        for (var i = 0; i < element.length; i+=1){
            if (typeof(element[i]) != "number"){                
                element.splice(i, 1);
                i -= 1;
            }
        }
    });
    return arr;
}

function reverse(){
    var arr = [];
    for (var i = arguments.length - 1; i >= 0; i-=1){
        arr.push(arguments[i].split("").reverse().join("")); 
    }    
    return arr;
}