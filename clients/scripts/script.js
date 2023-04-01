require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import requests from "./modules/requests";
import {renderUserProfileBlock} from './component/userProfileBlock'

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    requests();

    if (localStorage && localStorage.getItem('user_id')) {
        let block = document.getElementsByClassName('header__buttons')
        if (block.length) {
            block[0].innerHTML = renderUserProfileBlock();

            document.getElementById("logout").addEventListener("click", () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                localStorage.removeItem("user_name");
                location.href = 'home.html';
            })
        }
    }
})
