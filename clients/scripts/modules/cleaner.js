"use strict";

function clean(state){
    Object.keys(state).forEach(key => delete state[key]);
}

function cleanInputs(nameFlag) {
    switch (nameFlag){
        case "formInputs":
            document.getElementById("form-name-input").value = "";
            document.getElementById("form-password-input").value = "";
        break;
        case "userInputs": 
            document.getElementById("user-id").value = "";
            document.getElementById("user-name").value = "";
            document.getElementById("user-password").value = "";
        break;
    }
}


export {clean, cleanInputs};