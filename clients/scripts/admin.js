import {bindInput} from "./modules/bindFunc";

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const inputProductID = document.getElementById("input-id"),
        inputProductName = document.getElementById("input-name"),
        inputProductPrice = document.getElementById("input-price"),
        inputProducTitlte = document.getElementById("input-title"),
        inputUserID = document.getElementById("input-user-id"),

        addProductButton = document.getElementById("add-product"),
        editProductButton = document.getElementById("edit-product"),
        deleteProductButton = document.getElementById("delete-product"),
        getAllProductsButton = document.getElementById("get-all-products"),
        findUserButton = document.getElementById("find-user"),
        getAllUsersButton = document.getElementById("get-all-users"),
        deleteUserButton = document.getElementById("delete-user");

    const state = {

    }

    bindInput(state, inputProductID);
    bindInput(state, inputProductName);
    bindInput(state, inputProductPrice);
    bindInput(state, inputProducTitlte);
    bindInput(state, inputUserID);



})