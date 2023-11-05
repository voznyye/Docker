function bindInput(state, input){
    input.addEventListener("input", event => {
        state[event.target.name] = event.target.value;
        console.log(state);
    })
}


export {bindInput};