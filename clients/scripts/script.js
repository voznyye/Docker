require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import requests from "./modules/requests";
import { currentUserInit } from "./modules/currentUserInit";

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    requests();
    currentUserInit();

})
