import {clean, cleanInputs} from "../modules/cleaner";
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

                            localStorage.removeItem("token");
                            localStorage.removeItem("user_id");
                            localStorage.removeItem("user_name");
                            localStorage.setItem("token", response.hash);
                            localStorage.setItem("user_id", response.user.id);
                            localStorage.setItem("user_name", response.user.name);
                            clean(state);
                            cleanInputs("formInputs");
                            location.href = 'users.html';
                            // Переход на другую страницу, не обновляя текущую.
                            console.log(document.location);
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
