function print(size){
    if(typeof(size) === "number" && size !== NaN){
        let string = "\n";
        for (let i = size; i > 0; i -= 1){
            for (let k = size - i; k > 0; k -= 1){
                string += " ";
            }
            string += "*";
            let j = ((i-2)*2+1);
            for (; j >= 1; j -= 1){
                string += " ";
                if (j == 1){
                    string += "*";
                }
            }
            string += `\n`;
        }        
        return string;
    }else{
        return null;
    }
}

function print2(size){
    if(typeof(size) === "number" && size !== NaN){
        let string = "\n";
        for (let i = 1; i < size; i += 1){
            for (let k = size - i; k > 0; k -= 1){
                string += " ";
            }
            string += "*";            
            for (let j = ((i-2)*2+1); j >= 1; j -= 1){
                string += " ";
                if (j == 1){
                    string += `*`;
                }
            }
            for (let k = size - i; k > 0; k -= 1){
                string += " ";
            }
            for (let k = size - i; k > 0; k -= 1){
                string += " ";
            }
            string += "*";
            for (let j = ((i-2)*2+1); j >= 1; j -= 1){
                string += " ";
                if (j == 1){
                    string += `*`;
                }
            }
            string += `\n`;
        }
        for (let i = size; i > 0; i -= 1){
            for (let k = size - i; k > 0; k -= 1){
                string += " ";
            }
            string += "*";
            for (let j = ((i-2)*2+1); j >= 1; j -= 1){
                string += " ";
                if (j == 1){
                    string += "*";
                }
            }
            for (let k = size - i; k > 0; k -= 1){
                string += " ";
            }
            for (let k = size - i; k > 0; k -= 1){
                string += " ";
            }
            string += "*";
            for (let j = ((i-2)*2+1); j >= 1; j -= 1){
                string += " ";
                if (j == 1){
                    string += "*";
                }
            }
            string += `\n`;
        }    
        return string;
    }else{
        return null;
    }
}

function calculate(){
    let resObj = {"history": [], "formula":"", "args": {}};
    function calc(resObj){
        let result;
        do{
            result = prompt(`Введите 1, если необходимо произвести рассчёт формулы y = kx + b. \nВведите 2, если необходимо произвести рассчёт формулы y = x^2.\nВведите exit если необходимо закончить рассчёты`);
            resObj.history.push(result);
        }
        while(result !== "1" && result !== "2" && result !== "exit");
        let y = 0;        
        if (result === "1"){
            resObj.formula = "y = kx + b";
            do{
              result = prompt(`Введите k для рассчёта формулы y = kx + b`);  
              resObj.history.push(result);
            }            
            while((typeof(+result) !== "number" || isNaN(result) || result === null || result == "") && result !== "exit");            
            if(result === "exit"){
                return resObj;
            }
            resObj.args.k = +result;
            do{
                result = prompt(`Введите x для рассчёта формулы y = kx + b`);
                resObj.history.push(result);
            }
            while((typeof(+result) !== "number" || isNaN(result) || result === null || result == "") && result !== "exit");
            if(result === "exit"){
                return resObj;
            }            
            resObj.args.x = +result;  
            do{
                result = prompt(`Введите b для рассчёта формулы y = kx + b`);
                resObj.history.push(result);
            }
            while((typeof(+result) !== "number" || isNaN(result) || result === null || result == "") && result !== "exit");
            if(result === "exit"){
                return resObj;
            }            
            resObj.args.b = +result;
            y = parseFloat(resObj.args.k) * parseFloat(resObj.args.x) + parseFloat(resObj.args.b);
            alert(y);
            calc(resObj);
        }else if(result === "2"){
            resObj.formula = "y = x^2";
            do{
                result = prompt(`Введите x для рассчёта формулы y = x^2`);
                resObj.history.push(result);
            }
            while((typeof(+result) !== "number" || isNaN(result) || result === null || result == "") && result !== "exit")           
            if(result === "exit"){
                return resObj;
            }
            resObj.args.x = +result;
            y = Math.pow(parseFloat(resObj.args.x), 2);
            alert(y);
            calc(resObj);
        }else if(result === "exit"){
            return resObj;
        }else{
            calc(resObj);
        }
    }
    calc(resObj);
    return resObj;
}