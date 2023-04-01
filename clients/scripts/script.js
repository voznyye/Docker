
require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import requests from "./modules/requests";
import {renderUserProfileBlock} from './component/userProfileBlock'

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    requests();

    if (localStorage) {
        let block = document.getElementsByClassName('header__buttons')
        if (block.length) {
            block[0].innerHTML = renderUserProfileBlock();
        }
    }
})
