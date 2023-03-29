
require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import requests from "./modules/requests";
import "./modules/cleaner";

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    requests();

})