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
                let timerID;
                Message.createMessage(".sign__title");
                Message.addMessage("Please wait...");

                postRequest(`${window.env.host}/api/login/`, state, getToken("token"))
                .then(response => {
                    timerID = setTimeout(function delay(){
                        if(response){
                            console.log("response");
                            Message.addMessage("success");
                            updateLocalStorage("token", response.data.hash);
                            updateLocalStorage("user_id", response.data.user.id)
                            updateLocalStorage("user_name", response.data.user.name)
                            clean(state);
                            cleanInputs("formInputs");
                            // Переход на другую страницу, не обновляя текущую страницу
                            // location.href = 'user.html';
                            clearInterval(timerID); 
                        } else {
                            setTimeout(delay, 3000);
                        }
                    }, 3000)
                })
                .catch(error => {
                    timerID = setTimeout(function delay() {
                        if(error){
                            console.log(error);
                            console.log("error");
                            Message.addMessage("failed");
                            alert(error.response.data.error);
                            clearInterval(timerID); 
                        } else {
                            setTimeout(delay, 3000);
                        }
                    }, 3000)
                })
                .finally(() => {                           
                    setTimeout(() => Message.deleteMessage(), 5000);
                    console.log(timerID);
                })
            }
        }
                                                            // this = event в данном случае. event объект события передается в getElementuser()
        signINButton.addEventListener("click", sendRequest.bind(this));

    }

    signIN();

})
