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

module.exports = {
    print,
    print2
};