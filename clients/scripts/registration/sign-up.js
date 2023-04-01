import {clean, cleanInputs} from "../modules/cleaner";
import {bindInput} from "../modules/bindFunc";
import {postRequest} from "../resources/resources";
import getToken from "../verification/verification";

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    function signUP() {
        const state = {};

        const signUPButton = document.getElementById("form-sign_up-button"),
            formNameInput = document.getElementById("form-name-input"),
            formPasswordInput = document.getElementById("form-password-input");

        bindInput(state, formNameInput);
        bindInput(state, formPasswordInput);


        signUPButton.addEventListener("click", event => {
            event.preventDefault();

            if (!state.name || !state.password) {
                alert("Заполните имя и пароль");
                return;
            }
<<<<<<< HEAD
    
            if(event && event.target){
                postRequest("http://127.0.0.1/api/user/", state, getToken("token"))
                .then(response => {
                    const timer = setTimeout(function delay(){
                        if(response){
                            clearInterval(timer);
                            console.log(response.message);
                            // window.open("file:///C:/OSPanel/domains/AEH-project/clients/log-in.html");
                            clean(state);
                            cleanInputs("formInputs");
                            // Переход на другую страницу, не обновляя текущую.
                            location.href = 'log-in.html';
                        } else {
                            setTimeout(delay, 3000);
                        }
                    }, 3000)
=======
>>>>>>> ecd020b8a58186ca448d35b104a9db29380603dd

            if (event && event.target) {
                postRequest(window.env.host + "/api/user/", state, getToken("token"))
                    .then(response => {
                        const timer = setTimeout(function delay() {
                            if (response) {
                                clearInterval(timer);
                                console.log(response.message);
                                // window.open("file:///C:/OSPanel/domains/AEH-project/clients/log-in.html");
                                clean(state);
                                cleanInputs("formInputs");
                                location.href = 'log-in.html';
                            } else {
                                setTimeout(delay, 3000);
                            }
                        }, 3000)

                    })
            }
        })
    }

    signUP();
})
