//div
const div = document.createElement("div");
div.style.display = "none";
div.style.position = "relative";
div.style.margin = "100px auto";
div.style.width = "600px";
div.style.height = "300px";
div.style.backgroundColor = "grey";
div.innerHTML = "Lesson_5 part 1";
div.style.textAlign = "center";
div.style.fontSize = "20px";
div.style.lineHeight = "300px";

//иконка закрытия
const icon = document.createElement("img");
icon.style.position = "absolute";
icon.style.width = "20px";
icon.style.right = "10px";
icon.style.top = "10px";
icon.src = "./icon.png";
icon.style.transitionDuration = "200ms";
//кнопка
const button = document.createElement("button");
button.style.display = "block";
button.innerHTML = "Open";
button.style.margin = "200px auto";
button.style.fontSize = "30px";
document.body.append(div);
div.append(icon);
document.body.append(button);
//клик по кнопке
button.addEventListener("click", (event) => {
    div.style.display = "block";
    button.style.display = "none";
});
//клик по крестики
icon.addEventListener("click", (event) => {
    div.style.display = "none";
    button.style.display = "block";
});

icon.addEventListener("mouseover", (event) => {
    icon.style.width = "25px";  
})
icon.addEventListener("mouseleave", (event) => {
    icon.style.width = "20px";
})