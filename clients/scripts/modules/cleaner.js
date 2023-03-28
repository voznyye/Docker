"use strict";

function clean(state){
    Object.keys(state).forEach(key => delete state[key]);
}

function cleanInputs() {
    document.getElementById("form-name-input").value = "";
    document.getElementById("form-password-input").value = "";
}


export {clean, cleanInputs};