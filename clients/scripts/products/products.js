require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import { bindInput } from "../modules/bindFunc";
import { postRequest } from "../resources/resources";
import { currentUserInit } from "../modules/currentUserInit";
import getToken from "../verification/verification";


window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    currentUserInit("products");

    const searchInput  = document.getElementById("search-input"),
        productNameInput = document.getElementById("product-name"),
        productDescriptionInput = document.getElementById("product-description"),
        productPriceInput = document.getElementById("product-price"),

        searchButton = document.getElementById("get-one"),
        createButton = document.getElementById("create-new-item"),
        changeButton = document.getElementById("change-data"),
        deleteButton = document.getElementById("delete"),
        getAllButton = document.getElementById("get-all");

    const state = {};

    // магический строк 
    const methods = {
        get: "GET",
        delete: "DELETE"
    }

    bindInput(state, searchInput);
    bindInput(state, productNameInput);
    bindInput(state, productDescriptionInput);
    bindInput(state, productPriceInput);

    function createItem(event){
        event.preventDefault();

        if(!state.productName || !state.productDescription || !state.productPrice){
            alert("Заполните поля name, description, price");
            return;
        }

        if(event && event.target){
            postRequest(`${window.env.host}/api/products/`, state, getToken("token"))
            .then(response => console.log(response));
        }
    }

    createButton.addEventListener("click", createItem.bind(this));

})