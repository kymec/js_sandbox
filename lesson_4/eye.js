window.addEventListener('mousemove', (event) => {    
    eye1.style.left = `calc(${beginX}% + ${calcCorrection(event).x}px)`;
    eye1.style.top = `calc(${beginY}% + ${calcCorrection(event).y}px)`;
    eye2.style.left = `calc(${beginX}% - 50px + ${calcCorrection(event).x}px)`;
    eye2.style.top = `calc(${beginY}% + ${calcCorrection(event).y}px)`;    
});

function calcCorrection(event){
    let width = document.getElementsByTagName("body")[0].clientWidth;
    let height = heightWindow;
    x = ((event.clientX - (width / 2)) / (width / 2)) * 5;
    y = ((event.clientY - (height / 2)) / (height / 2)) * 5;
    console.log(`x: ${x}; y: ${y}`);
    return {"x": x, "y": y};
}
const heightWindow = 800;
const diameterEyes = 7;
const beginX = 49.5;
const beginY = 36;

const eyes = document.createElement("div");
document.body.append(eyes);
eyes.style.height = `${heightWindow}px`;
eyes.style.textAlign = "center";

const mliza = document.createElement("img");
mliza.src = "./mliza.jpg";
mliza.style.margin = "0 auto";
eyes.append(mliza);

const eye1 = document.createElement("div");
eye1.style.position = "absolute";
eye1.style.left = `calc(${beginX}%)`;
eye1.style.top = `calc(${beginY}%)`;
eye1.style.width = `${diameterEyes}px`;
eye1.style.height = `${diameterEyes}px`;
eye1.style.borderRadius = "50%";
eye1.style.backgroundColor = "#421b1c";
eyes.append(eye1);

const eye2 = document.createElement("div");
eye2.style.position = "absolute";
eye2.style.left = `calc(${beginX}% - 50px)`;
eye2.style.top = `calc(${beginY}%)`;
eye2.style.width = `${diameterEyes}px`;
eye2.style.height = `${diameterEyes}px`;
eye2.style.borderRadius = "50%";
eye2.style.backgroundColor = "#421b1c";
eyes.append(eye2);

