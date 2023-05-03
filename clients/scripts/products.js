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

        searchButton = document.getElementById("get-one"),
        createButton = document.getElementById("create-new-item"),

        productsContainer = document.getElementById("products-hero"),

        changeProductButton = document.getElementById("change-data"),
        deleteProductButton = document.getElementById("delete");

    let state = {
        products: [],
        newProductChanges: {}
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
                // if(checkedError || !checkedError){
                //     location.reload();
                // }
            })
        }
    }

    // function searchProduct(event){
    //     event.preventDefault();
    //     if(!searchInput.value){
    //         alert("Укажите id продукта");
    //         return;
    //     }

    //     if(event && event.target){
    //         event.target.disabled = true;
    //         request(methods.get, `${window.env.host}/api/products/${searchInput.value}`, getToken("token"))
    //         .then(response => {
    //             event.target.disabled = false;
    //             if(response.error){
    //                 alert(response.error);
    //             } else {
    //                 cleanProducts();
    //                 state.products = [{...response}];
    //                 state.products.map(item => productsContainer.innerHTML += renderProductCard(item))
    //             }
    //         })
    //     }
    // }

    function createProducts() {
        request(methods.get, `${window.env.host}/api/products/`, getToken("token"))
        .then(response => {
            console.log(response);
            cleanProducts();
            if(!!response.length){
                state.products = response;
                state.products.map(item => productsContainer.innerHTML += renderProductCard(item))
            } 
        });
    }

    function changeProduct(event){
        if(!searchInput.value || ((!productNameInput.value && !productDescriptionInput.value && !productPriceInput.value))){
            alert("Обязательно заполните поля id, и один из трех полей ниже, чтобы изменить информацию о продукте!");
            return;
        }
        if(event && event.target){
            event.target.disabled = true;
            changeData(`${window.env.host}/api/products/${state.newProductChanges.id}`, 
            JSON.stringify({
                name: state.newProductChanges.name, 
                price: state.newProductChanges.price, 
                title: state.newProductChanges.title
            }), 
            getToken("token"))
            .then(response => {
                console.log(response.data.message);
                event.target.disabled = false;
                alert(response.message);
                // getAllButton.click();
                cleanInputs("productInputs");
                cleanProducts();
                createProducts();
            })
            .catch(error => {
                console.log(error);
                alert(error.response.data.error);
            });
        }
    }

    function deleteProduct(event){
        if(!searchInput.value){
            alert("Укажите id продукта");
            return;
        }

        if(event && event.target){
            event.target.disabled = true;
            request("DELETE", `${window.env.host}/api/products/${searchInput.value}`, getToken("token"))
            .then(response => {
                alert(response.message);
                cleanInputs("productInputs");
                cleanProducts();
                createProducts();
                event.target.disabled = false;
            });
        }
    }

    function cleanProducts() {
        productsContainer.innerHTML = "";
    }

    createButton.addEventListener("click", createItem.bind(this));

    // searchButton.addEventListener("click", searchProduct.bind(this));

    changeProductButton.addEventListener("click", changeProduct.bind(this));

    deleteProductButton.addEventListener("click", deleteProduct.bind(this));


    // For admin page
/*     changeButton = document.getElementById("change-data"),
    deleteButton = document.getElementById("delete"),
    getAllButton = document.getElementById("get-all"), */
/*     function getAllProducts(event) {
        event.target.disabled = true;
        if(event && event.target){
            request(methods.get, `${window.env.host}/api/products/`, getToken("token"))
            .then(response => {
                console.log(response);
                cleanProducts();
                state.products = response;
                state.products.map(item => productsContainer.innerHTML += renderProductCard(item))
                event.target.disabled = false;
            });
        }
    }

    function changeProduct(event){
        if(!searchInput.value || ((!productNameInput.value && !productDescriptionInput.value && !productPriceInput.value))){
            alert("Обязательно заполните поля id, и один из трех полей ниже, чтобы изменить информацию о продукте!");
            return;
        }
        if(event && event.target){
            event.target.disabled = true;
            changeData(`${window.env.host}/api/products/${state.newProductChanges.id}`, {name: state.newProductChanges.name, price: state.newProductChanges.price, title: state.newProductChanges.title}, getToken("token"))
            .then(response => {
                const timer = setTimeout(function delay(){
                    if(response){
                        clearInterval(timer);
                        event.target.disabled = false;
                        if(response.error){
                            alert(response.error);
                        } else {
                            alert(response.message);
                            getAllButton.click();
                            cleanInputs("productInputs");
                        }
                    } else {
                        setTimeout(delay, 5000)
                    }
                }, 5000)
            });
        }
    }

    function deleteProduct(event){
        if(!searchInput.value){
            alert("Укажите id продукта");
            return;
        }

        if(event && event.target){
            event.target.disabled = true;
            request(methods.delete, `${window.env.host}/api/products/${searchInput.value}`, getToken("token"))
            .then(response => {
                alert(response.message);
                getAllButton.click();
                event.target.disabled = false;
            });
        }
    } */



    // For admin page
/*     getAllButton.addEventListener("click", getAllProducts.bind(this));

    changeButton.addEventListener("click", changeProduct.bind(this));

    deleteButton.addEventListener("click", deleteProduct.bind(this)); */


})