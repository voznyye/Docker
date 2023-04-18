function bindInput(state, input){
    input.addEventListener("input", event => {
        state[event.target.name] = event.target.value;
        console.log(state);
    })
}

function bindImageInput(state, input){
    const needPath = "./images/";
    input.addEventListener("input", event => {
        state[event.target.name] = needPath + event.target.value.split("\\").filter((item, index, arr) => index === arr.length - 1).join("");
        console.log(state);
    })
}

export {bindInput, bindImageInput};