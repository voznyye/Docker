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
                    const timer = setTimeout(function delay(){
                        if(response){
                            if(response.error){
                                alert(response.error);
                                clearInterval(timer);
                                return;
                            } 
                            clearInterval(timer);
                            window.open("file:///C:/OSPanel/domains/AEH-project/clients/users.html");
                            localStorage.removeItem("token");
                            localStorage.setItem("token", response.hash);
                            clean(state);
                            cleanInputs();
                        } else {
                            setTimeout(delay, 2000);
                        }
                    }, 2000)
                })
            }
        })

    }

    signIN();

})