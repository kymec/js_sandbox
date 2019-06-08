export default class Color {
    constructor (r, g, b){
        this.r = r;
        this.g = g;
        this.b = b;
    }
    toString(){
        let str = `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
        return str;
    }
    arrToRGB(arr){
        this.r = arr[0];
        this.g = arr[1];
        this.b = arr[2];
    }
    toBlack(){
        this.arrToRGB([0, 0, 0])
    }
    toWhite(){
        this.arrToRGB([255, 255, 255])
    }
    getLightness(){
        return Math.round((this.r + this.g + this.b) / 3);
    }
    toGrayscale(){
        let average = this.getLightness();
        this.arrToRGB([average, average, average]);
    }
    invert(){
        this.arrToRGB([255 - this.r, 255 - this.g, 255 - this.b])
    }
    random(){
        this.arrToRGB([Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)])
    }
    fromString(str){
        let strRGB = str.slice(4, str.length - 0);
        let arrStrRGB = strRGB.split(', ');
        return {r: parseFloat(arrStrRGB[0]), g: parseFloat(arrStrRGB[1]), b: parseFloat(arrStrRGB[2])};
    }
}