require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

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

        function sendRequest(event){
            event.preventDefault();

            if (!state.name || !state.password) {
                alert("Заполните имя и пароль");
                return;
            }

            if (event && event.target) {
                postRequest(`${window.env.host}/api/user/`, state, getToken("token"))
                .then(response => {
                    const timer = setTimeout(function delay() {
                        if (response) {
                            clearInterval(timer);
                            console.log(response.message);

                            clean(state);
                            cleanInputs("formInputs");

                            // Переход на другую страницу, не обновляя текущую страницу
                            location.href = 'log-in.html';
                        } else {
                            setTimeout(delay, 5000);
                        }
                    }, 5000)

                })
                .catch(error => alert(error));
            }
        }

                                                            // this = event в данном случае. event объект события передается в getElementuser()
        signUPButton.addEventListener("click", sendRequest.bind(this));
    }

    signUP();
})
