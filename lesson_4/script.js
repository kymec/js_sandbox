function makeImages(...link){
    const div = [];
    const img = [];
    for (let i = 0; i < link.length; i += 1){
        div[i] = document.createElement('div');
        document.body.append(div[i]);
        img[i] = document.createElement('img');
        div[i].append(img[i]);
        img[i].src = link[i];
    }
}

class FormBuilder{
    constructor(){
        this.form = document.createElement("form");
    }
    appendTo(target){
        target.append(this.form);
    }
    addInput(name){
        const input = document.createElement("input");
        input.type = "text";
        input.name = name;
        this.form.append(input);
    }
    addCheckbox(name){
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = name;
        this.form.append(checkbox);
    }
    addButton(name){
        const button = document.createElement("button");
        button.append(name);
        this.form.append(button);
    }
    destroy(){
        this.form.parentElement.removeChild(this.form);
    }
}

function initBall(){
    const ball = document.createElement("div");
    ball.style.position = "absolute";
    ball.style.left = `${Math.floor(Math.random() * 100)}%`;
    ball.style.top = `${Math.floor(Math.random() * 100)}%`;
    ball.style.width = "50px";
    ball.style.height = "50px";
    ball.style.borderRadius = "50%";
    ball.style.backgroundColor = "blue";
    document.body.append(ball);
    const ballClick = (event) => {
        ball.style.left = `${Math.floor(Math.random() * 100)}%`;
        ball.style.top = `${Math.floor(Math.random() * 100)}%`;
        event.stopPropagation();
    }
    const documentClick = () => {
        ball.removeEventListener("click", ballClick);
        document.removeEventListener("click", documentClick)
        ball.remove();
        
    }
    ball.addEventListener("click", ballClick);
    document.addEventListener("click", documentClick);
}

