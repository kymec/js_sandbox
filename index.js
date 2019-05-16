"use strict"

function makeGreetings(age){
    var year;
    var ageYear = age % 100;
    if (ageYear > 19){
        ageYear = ageYear % 10;
    }
    if (ageYear == 1){
        year = "год";
    } else if (ageYear == 2 || ageYear == 3 || ageYear == 4){
        year = "года";
    } else{
        year = "лет";
    }
    return ("Мой возраст " + age + " " + year);
}

function splitArray(arr, num){
    var arrFull = [];
    var arrSmall;
    for (var i = 0; i < arr.length; i+=num){
        if (i + num < arr.length){
            arrSmall = arr.slice(i, i + num);
        } else{
            arrSmall = arr.slice(i);
        }
        arrFull.push(arrSmall);
    }
    return arrFull;
}

function add(num1){
    return function (num2){
        return num1 + num2;
    }
}

function transformData(arr){
    var resObj = {};
    arr.map(function(item){
        if(item["mark"] > 5){
            resObj[item["login"]] = item["firstName"] + " " + item["lastName"];
        }
    })
    return resObj;
}