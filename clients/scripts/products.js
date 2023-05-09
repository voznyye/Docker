require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import { bindInput} from "./modules/bindFunc";
import { changeData, request, uploadFile} from "./resources/resources";
import { currentUserInit } from "./modules/currentUserInit";
import { renderProductCard } from "./modules/render";
import { cleanInputs } from "./modules/cleaner";
import getToken from "./verification/verification";

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const searchInput  = document.getElementById("search-input"),
        productNameInput = document.getElementById("product-name"),
        productDescriptionInput = document.getElementById("product-description"),
        productPriceInput = document.getElementById("product-price"),
        productImageInput = document.getElementById("product-img"),

        createButton = document.getElementById("create-new-item"),
        payButton = document.getElementById("pay"),

        productsContainer = document.getElementById("products-hero");


    const state = {
        products: [],
        newProductChanges: {},
        amount: JSON.parse(localStorage.getItem("amount")) ? JSON.parse(localStorage.getItem("amount")) : 0
    };

    const methods = {
        get: "GET"
    }

    currentUserInit("products");
    cleanProducts();
    createProducts();

    bindInput(state.newProductChanges, searchInput);
    bindInput(state.newProductChanges, productNameInput);
    bindInput(state.newProductChanges, productDescriptionInput);
    bindInput(state.newProductChanges, productPriceInput);

    function createItem(event){
        event.preventDefault();

        if((!productNameInput.value || !productDescriptionInput.value || !productPriceInput.value) || searchInput.value){
            alert("Заполните поля name, description, price");
            return;
        }

        const formData = new FormData();
        const fileField = productImageInput;
        formData.append('product', JSON.stringify(state.newProductChanges));

        // здесь тег input = fileFiled, filesInput = ["file", "file", file", file] - поскольку в теге input указан multiple
        formData.append("image", fileField.files[0]);


        if(event && event.target){
            event.target.disabled = true;
            uploadFile(`${window.env.host}/api/products/`, formData, getToken("token"))
            .then(response => {
                console.log(response);
                cleanInputs("productInputs");
                createProducts();
                event.target.disabled = false;
            })
            .catch(error => {
                console.log(error);
                const checkedError = confirm(error.message);
                event.target.disabled = false;
                if(checkedError || !checkedError){
                    location.reload();
                }
            })
        }
    }

    function createProducts() {
        request(methods.get, `${window.env.host}/api/products/`, getToken("token"))
        .then(response => {
            console.log(response);
            cleanProducts();
            document.getElementById("amount").textContent = `Your amount: ${state.amount}zł`;
            if(!!response.length){
                state.products = response;
                state.products.map(item => {
                    productsContainer.innerHTML += renderProductCard(item)
                })
                bindAddButton("#product-button")
            } 
        });
    }

    function bindAddButton(selector) {
        const buttons = document.querySelectorAll(selector);

        buttons.forEach((button, index) => {
            button.addEventListener("click", event => {
                event.preventDefault();
    
                if(event && event.target){
                    state.products.map((item, i) => {
                        if(index === i){
                            state.amount += item.price;
                            localStorage.setItem("amount", state.amount);
                        }
                    })  
                    document.getElementById("amount").textContent = `Your amount: ${state.amount}zł`;
                }
            }) 
        }) 
    }

    function cleanProducts() {
        productsContainer.innerHTML = "";
    }

    function payLoad(event) {
        event.preventDefault();

        if(event && event.target && !!state.amount){
            location.href = "pay.html"
        }
    }

    createButton.addEventListener("click", createItem.bind(this));

    payButton.addEventListener("click", payLoad.bind(this))





})





