import Color from './color';

const color = new Color();
let colorStr;
color.random();
colorStr = color.toString();

class MiniSlider {
    constructor (divId){
        this.divId = document.getElementById(divId);
        this.img = this.divId.getElementsByClassName('img');
        this.len = this.img.length;
        this.hideAll();
        this.show(0);
        this.createButtons();
    }
    hideAll(){        
        for (let i = 0; i < this.len; i += 1){
            this.img[i].style.width = "0";
            //this.img[i].style.display = "none";
        }
    }
    show(n){
        this.n = n;        
        this.img[n].style.display = "block";
        this.img[n].style.width = "100%";
    }
    createButtons(){
        this.button1 = document.createElement('div');
        this.button2 = document.createElement('div');
        this.button1.className = "button";
        this.button2.className = "button";
        
        this.divId.append(this.button1);
        this.button1.innerHTML = "<";
        this.button1.style.left = "10px";


        this.divId.append(this.button2);
        this.button2.innerHTML = ">";
        this.button2.style.right = "10px";

        this.button2.addEventListener("click", () => {
            this.next.bind(this)();
            color.random();
            colorStr = color.toString();
            this.button2.style.border = `2px solid ${colorStr}`;
            this.button1.style.border = `2px solid ${colorStr}`;
        });
        this.button1.addEventListener("click", () => {
            this.prev.bind(this)();
            color.random();
            colorStr = color.toString();
            this.button2.style.border = `2px solid ${colorStr}`;
            this.button1.style.border = `2px solid ${colorStr}`;    
        });
    }
    next(){
        if(this.img.length == this.n + 1){
            this.n = 0;
        } else{
            this.n += 1
        }
        this.hideAll();
        this.show(this.n);    
    }
    prev(){
        if(this.n == 0){
            this.n = this.img.length - 1;
        } else{
            this.n -= 1
        }
        this.hideAll();
        this.show(this.n);    
    }
    destroy(){
        this.button2.removeEventListener("click", () => this.next.bind(this)());
        this.button1.removeEventListener("click", () => this.prev.bind(this)());
        this.button1.remove();
        this.button2.remove();
        for (let i = 0; i < this.len; i += 1){
            this.img[i].style.display = "block";
        }
    }
}
window.Color = Color;
window.MiniSlider = MiniSlider;