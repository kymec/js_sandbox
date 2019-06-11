function matrixDiff(arr1, arr2){
    let sum = 0;
    if(arr1.length == arr2.length){
        for(let i = 0; i < arr1.length; i += 1){
            if(arr1[i].length == arr2[i].length){
                for(let j = 0; j < arr1[i].length; j += 1)
                {
                    sum += Math.abs(arr1[i][j] - arr2[i][j]);
                }
            } else{
                return NaN;
            }
        }
    } else{
        return NaN;
    }
    return sum;
}
window.matrixDiff = matrixDiff;

function strangeSearch(stringArr){
    let div = []
    let input = [];
    let str;
    let num;
    let link = "https://www.youtube.com/results?search_query=";
    const form = document.createElement("form");
    document.body.append(form);
    form.method = "link";
    for(let i = 0; i < stringArr.length; i += 1){
        div[i] = document.createElement("div");
        form.append(div[i]);
        div[i].innerHTML = `${stringArr[i]}`;
        input[i] = document.createElement("input");
        form.append(input[i]);
        input[i].type = "number";
        input[i].value = 0;    
    }
    const button = document.createElement("button");
    document.body.append(button);
    button.innerHTML = "Search";
    button.id = "go";
    button.type = "button";
    button.addEventListener("click", () => {
        for(let k = 0; k < stringArr.length - 1; k +=1){        
            for(let j = 0; j < stringArr.length - 1; j += 1){
                if (input[j].value > input[j+1].value){
                    str = stringArr[j];
                    stringArr[j] = stringArr[j+1];
                    stringArr[j+1] = str;
                    num = input[j].value;
                    input[j].value = input[j+1].value;
                    input[j+1].value = num;
                }
            }
        }
        for (let m = 0; m < stringArr.length; m += 1){
            if(input[m].value != 0){
                link += stringArr[m] + "+";
            }            
        }
        window.location.href = link;
    })

}
window.strangeSearch = strangeSearch;

import cat from "./cat.png";
function stickyСat(){

    const img = document.createElement("img");
    document.body.append(img);
    img.className = "cat";
    img.src = cat;
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100px";

    window.addEventListener("mousemove", (event) => {
        img.style.left = `${event.clientX}px`;
        img.style.top = `${event.clientY}px`;
    })
}
function unstickTheСat(){
    let img = document.getElementsByClassName("cat");
    for(let f = 0; f < img.length; f += 1){
        img[f].remove();        
    }
    img[0].remove();
    img[0].remove();
    window.removeEventListener("mousemove", (event) => {
    img.style.left = `${event.clientX}px`;
    img.style.top = `${event.clientY}px`;
    })
    
}
window.stickyСat = stickyСat;
window.unstickTheСat = unstickTheСat;



