"use strict"

class Human {
    constructor(obj){
        this.name = obj.name;
        this.age = obj.age;
    }
    sayHello(){
        console.log("Hello, my name is " + this.name + ", I am " + this.age + " years old");
       // console.log(`Hello, my name is ${this.name} , I am ${this.age} years old"`);
    }
}

class AlevelStudent extends Human{
    constructor(obj){
        super(obj);
        this.name = obj.name;
        this.age = obj.age;
        this.marks = obj.marks;
    }
    averageMark(){
        let sum=0;
        console.log(this.marks);
        for (var i = 0; i < this.marks.length; i+=1){
            sum += this.marks[i];
        }
        return sum / i;
    }
}

class Calculator {
    constructor(){
        this.result = 0;
    }
    reset(){
        this.result = 0;
        return this;
    }
    add(num){
        this.result += num;
        return this;
    }
    sub(num){
        this.result -= num;
        return this;
    }
    mul(num){
        this.result *= num;
        return this;
    }
    div(num){
        this.result /= num;
        return this;
    }
    pow(num){
        this.result = Math.pow(this.result, num);
        return this;
    }
    sqrt(){
        this.result = Math.sqrt(this.result);
        return this;
    }
    getResult(){
        return this.result;
    }
}

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return ("Point[" + this.x + " " + this.y + "]")
    }
    set(x, y){
        this.x = x;
        this.y = y;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }    
}

class Line{
    constructor(point1, point2){
        this.point1 = point1;
        this.point2 = point2;
    }
    toString(){
        return ("Line(" + this.point1.toString() + " - " + this.point2.toString() + ")")
    }
    length(){
        let length = Math.sqrt(Math.pow((this.point2.getX() - this.point1.getX()), 2) + Math.pow((this.point2.getY() - this.point1.getY()), 2));
        return (length);
    }
}

class WeightedPoint extends Point{
    constructor(x, y, weight){
        super(x, y);        
        this.weight = weight;
    }
    toString(){
        return (this.getWeight() + "&" + super.toString())
    }
    set(x, y, weight){
        super.set(x, y);
        this.weight = weight;
    }
    getWeight(){
        return this.weight;
    }
}
