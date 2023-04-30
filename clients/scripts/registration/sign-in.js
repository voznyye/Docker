require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import {clean, cleanInputs} from "../modules/cleaner";
import { bindInput } from "../modules/bindFunc";
import { postRequest } from "../resources/resources";
import getToken from "../verification/verification";
import { updateLocalStorage } from "../verification/verification";
import { Message } from "../component/renderMessages";

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
            if(!state.name || !state.password){
                alert("Заполните поля name и password");
                return;
            }
    
            if(event && event.target){
                Message.createMessage(".sign__title");
                Message.addMessage("Please wait...");

                postRequest(`${window.env.host}/api/login/`, state, getToken("token"))
                .then(response => {
                    console.log("response");
                    Message.addMessage("success");
                    updateLocalStorage("token", response.data.hash);
                    updateLocalStorage("user_id", response.data.user.id)
                    updateLocalStorage("user_name", response.data.user.name)
                    clean(state);
                    cleanInputs("formInputs");

                    if(response.data.user.name === "admin"){
                        location.href = 'admin.html';
                        return;
                    }
                    // Переход на другую страницу, не обновляя текущую страницу
                    location.href = 'user.html';
                })
                .catch(error => {                   
                    console.log(error);
                    clean(state);
                    cleanInputs("formInputs");
                    Message.addMessage("failed");
                    setTimeout(() => Message.addMessage(error.response.data.error), 3000)
                })
                .finally(() => {                         
                    setTimeout(Message.deleteMessage, 6000);
                })
            }
        }
                                                            // this = event в данном случае. event объект события передается в getElementuser()
        signINButton.addEventListener("click", sendRequest.bind(this));

    }

    signIN();

})
