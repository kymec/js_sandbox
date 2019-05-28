window.addEventListener('mousemove', (event) => {    
    eye1.style.left = `calc(${beginX}% - 5px + ${calcCorrection(event).x1}px)`;
    eye1.style.top = `calc(${beginY}px + ${calcCorrection(event).y1}px)`;
    eye2.style.left = `calc(${beginX}% - 58px + ${calcCorrection(event).x2}px)`;
    eye2.style.top = `calc(${beginY}px + ${calcCorrection(event).y2}px)`;    
});





function calcCorrection(event){
    let width = document.getElementsByTagName("body")[0].clientWidth;
    let a = beginY - event.clientY;
    let b = beginX * (width / 100) - event.clientX;
    angel1 = Math.atan(a/b);
    angel2 = Math.atan(a/(b - 50));
    y1 = zr * Math.sin(angel1);
    y2 = zr * Math.sin(angel2);
    x1 = zr * Math.cos(angel1);
    x2 = zr * Math.cos(angel2);
    if (b > 0){
        x1 *= -1;
        y1 *= -1;
    }
    if (b > 50){
        x2 *= -1;
        y2 *= -1;
    }
    
    
    return {"x1": x1, "y1": y1, "x2": x2, "y2": y2};
}
const heightWindow = 800;
const diameterEyes = 7;
const beginX = 50;
const beginY = 237;
const zr = 5;

const eyes = document.createElement("div");
document.body.append(eyes);
eyes.style.height = `${heightWindow}px`;
eyes.style.textAlign = "center";

const mliza = document.createElement("img");
mliza.src = "./mliza.jpg";
mliza.style.margin = "20px auto";
eyes.append(mliza);

const eye1 = document.createElement("div");
eye1.style.position = "absolute";
eye1.style.left = `calc(${beginX}% - 5px)`;
eye1.style.top = `calc(${beginY}px)`;
eye1.style.width = `${diameterEyes}px`;
eye1.style.height = `${diameterEyes}px`;
eye1.style.borderRadius = "50%";
eye1.style.backgroundColor = "#421b1c";
eyes.append(eye1);

const eye2 = document.createElement("div");
eye2.style.position = "absolute";
eye2.style.left = `calc(${beginX}% - 58px)`;
eye2.style.top = `calc(${beginY}px)`;
eye2.style.width = `${diameterEyes}px`;
eye2.style.height = `${diameterEyes}px`;
eye2.style.borderRadius = "50%";
eye2.style.backgroundColor = "#421b1c";
eyes.append(eye2);

