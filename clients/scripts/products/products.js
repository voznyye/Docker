require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import { bindInput } from "../modules/bindFunc";
import { postRequest, request, changeData} from "../resources/resources";
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



    const state = {
        products: [],
        newProductChanges: {}
    };

    // магический строк 
    const methods = {
        get: "GET",
        delete: "DELETE"
    }

    currentUserInit("products");
    cleanProducts();

    bindInput(state.newProductChanges, searchInput);
    bindInput(state.newProductChanges, productNameInput);
    bindInput(state.newProductChanges, productDescriptionInput);
    bindInput(state.newProductChanges, productPriceInput);

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
            .then(response => {
                cleanProducts();
                state.products = response;
                state.products.map(item => productsContainer.innerHTML += renderProductCard(item))
                console.log(state.products);
            });
        }
    }

    function changeProduct(event){
        if(!state.newProductChanges.id || ((!state.newProductChanges.name && !state.newProductChanges.title && !state.newProductChanges.price))){
            alert("Обязательно заполните поля id, и один из трех полей ниже, чтобы изменить информацию о продукте!");
            return;
        }
        if(event && event.target){
            changeData(`${window.env.host}/api/products/${state.newProductChanges.id}`, {name: state.newProductChanges.name, price: state.newProductChanges.price, title: state.newProductChanges.title}, getToken("token"))
            .then(response => {
                const timer = setTimeout(function delay(){
                    if(response){
                        clearInterval(timer);
                        console.log("clear");
                        if(response.error){
                            alert(response.error);
                            console.log("1");
                        } else {
                            alert(response.message);
                            state.products = state.products = state.products.map(item => {
                                if(item.id == +state.newProductChanges.id){
                                    const newItem = Object.fromEntries(Object.entries(state.newProductChanges).filter(obj => obj[1]));
                                    return {id: +item.id, ...newItem};
                                }
                                return item;
                            })
                            state.products.map(item => productsContainer.innerHTML += renderProductCard(item))
                            console.log("2");
                        }
                    } else {
                        setTimeout(delay, 5000)
                        console.log("3");
                    }
                }, 5000)
            });
        }
    }

    function cleanProducts() {
        productsContainer.innerHTML = "";
        state.products = [];
    }

    createButton.addEventListener("click", createItem.bind(this));

    getAllButton.addEventListener("click", getAllProducts.bind(this));

    changeButton.addEventListener("click", changeProduct.bind(this));

})
