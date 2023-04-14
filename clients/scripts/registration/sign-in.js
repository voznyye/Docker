require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import {clean, cleanInputs} from "../modules/cleaner";
import { bindInput } from "../modules/bindFunc";
import { postRequest } from "../resources/resources";
import getToken from "../verification/verification";
import { updateLocalStorage } from "../verification/verification";


window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    function signIN(){
        const state = {};
        
        const signINButton = document.getElementById("form-sign_in-button"),
            formNameInput = document.getElementById("form-name-input"),
            formPasswordInput = document.getElementById("form-password-input");

        bindInput(state, formNameInput);
        bindInput(state, formPasswordInput);


        function sendRequest(event){
            event.preventDefault();
            console.log(state);
            if(!state.name || !state.password){
                alert("Заполните поля name и password");
                return;
            }
    
            if(event && event.target){
                postRequest(`${window.env.host}/api/login/`, state, getToken("token"))
                .then(response => {
                    const timer = setTimeout(function delay(){
                        if(response){
                            clearInterval(timer);
                            if(response.error){
                                alert(response.error);
                                return;
                            }
                            updateLocalStorage("token", response.hash);
                            updateLocalStorage("user_id", response.user.id)
                            updateLocalStorage("user_name", response.user.name)
                            clean(state);
                            cleanInputs("formInputs");
                            // Переход на другую страницу, не обновляя текущую страницу
                            location.href = 'users.html';
                            console.log(response);
                        } else {
                            setTimeout(delay, 5000);
                        }
                    }, 5000)
                })
            }
        }
                                                            // this = event в данном случае. event объект события передается в getElementuser()
        signINButton.addEventListener("click", sendRequest.bind(this));

    }

    signIN();

})
