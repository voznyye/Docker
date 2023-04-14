require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import { bindInput } from "../modules/bindFunc";
import { postRequest, request } from "../resources/resources";
import { currentUserInit } from "../modules/currentUserInit";
import { renderProductCard } from "../modules/render";
import getToken from "../verification/verification";


window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const searchInput  = document.getElementById("search-input"),
        productNameInput = document.getElementById("product-name"),
        productDescriptionInput = document.getElementById("product-description"),
        productPriceInput = document.getElementById("product-price"),

        searchButton = document.getElementById("get-one"),
        createButton = document.getElementById("create-new-item"),
        changeButton = document.getElementById("change-data"),
        deleteButton = document.getElementById("delete"),
        getAllButton = document.getElementById("get-all"),

        productsContainer = document.getElementById("products-hero");



    const state = {};

    // магический строк 
    const methods = {
        get: "GET",
        delete: "DELETE"
    }

    currentUserInit("products");
    cleanProductsContainer();

    bindInput(state, searchInput);
    bindInput(state, productNameInput);
    bindInput(state, productDescriptionInput);
    bindInput(state, productPriceInput);

    function createItem(event){
        event.preventDefault();

        if(!state.name || !state.title || !state.price){
            alert("Заполните поля name, description, price");
            return;
        }

        if(event && event.target){
            postRequest(`${window.env.host}/api/products/`, state, getToken("token"))
            .then(response => console.log(response));
        }
    }

    function getAllProducts(event) {
        if(event && event.target){
            request(methods.get, `${window.env.host}/api/products/`, getToken("token"))
            .then(response => response.map(item => productsContainer.innerHTML += renderProductCard(item)));
        }
    }

    function cleanProductsContainer() {
        productsContainer.innerHTML = "";
    }

    createButton.addEventListener("click", createItem.bind(this));

    getAllButton.addEventListener("click", getAllProducts.bind(this));

})