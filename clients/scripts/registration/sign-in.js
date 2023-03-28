import {clean, cleanInputs} from "./../modules/cleaner";
import { bindInput } from "../modules/bindFunc";
import { postRequest } from "../resources/resources";
import getToken from "../verification/verification";


window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    function signIN(){
        const state = {};
        
        const signINButton = document.getElementById("form-sign_in-button"),
            formNameInput = document.getElementById("form-name-input"),
            formPasswordInput = document.getElementById("form-password-input");

        bindInput(state, formNameInput);
        bindInput(state, formPasswordInput);

        signINButton.addEventListener("click", event => {
            event.preventDefault();
            console.log(state);
            if(!state.name || !state.password){
                alert("Вы не зарегистрированы")
                return;
            }
    
            if(event && event.target){
                postRequest("http://127.0.0.1/api/login/", state, getToken("token"))
                .then(response => {
                    if(response.error){
                        alert(response.error);
                        return;
                    }
                    // window.open("file:///C:/OSPanel/domains/AEH-project/clients/users.html");
                    localStorage.removeItem("token");
                    localStorage.setItem("token", response.hash);
                })
                .finally(() => {
                    clean(state);
                    cleanInputs();
                    console.log(state);
                })
            }
        })

    }

    signIN();

})