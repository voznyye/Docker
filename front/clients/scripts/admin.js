import {bindInput} from "./modules/bindFunc";
import { renderProductCard } from "./modules/render";
import { request, changeData } from "./resources/resources";
import getToken from "./verification/verification";
import { renderUserCard } from "./modules/render";
import { sortUsersID } from "./modules/render";

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const inputProductID = document.getElementById("input-id"),
        inputProductName = document.getElementById("input-name"),
        inputProductPrice = document.getElementById("input-price"),
        inputProducTitlte = document.getElementById("input-title"),
        inputUserID = document.getElementById("input-user-id"),

        editProductButton = document.getElementById("edit-product"),
        deleteProductButton = document.getElementById("delete-product"),
        getAllProductsButton = document.getElementById("get-all-products"),
        findUserButton = document.getElementById("find-user"),
        getAllUsersButton = document.getElementById("get-all-users"),
        deleteUserButton = document.getElementById("delete-user"),

        adminContents = document.getElementById("products-hero");

    const state = {
        products: [],
        users: []
    };

    const methods = {
        get: "GET",
        delete: "DELETE"
    }

    bindInput(state, inputProductID);
    bindInput(state, inputProductName);
    bindInput(state, inputProductPrice);
    bindInput(state, inputProducTitlte);
    bindInput(state, inputUserID);

    function getAllProducts(event) {
        if(event && event.target) {
            event.target.disabled = true;
            request(methods.get, `${window.env.host}/api/products/`, getToken("token"))
            .then(response => {
                console.log(response);
                cleanProducts();
                if(!!response.length){
                    state.products = response;
                    state.products.map(item => {
                        adminContents.innerHTML += renderProductCard(item)
                    })
                    document.querySelectorAll(".product-hero__block").forEach(item => item.remove());
                } 
                event.target.disabled = false;
            });
        }
    }

    function getAllUsers(event){
        if(event && event.target){
            event.target.disabled = true;
            request(methods.get, `${window.env.host}/api/user/`, getToken("token"))
            .then(response => {
                console.log(response);
                cleanProducts();
                if(!!response.length){
                    state.users = response;
                    state.users.map(item => {
                        adminContents.innerHTML += renderUserCard(item);
                    })
                }
                event.target.disabled = false;
            });
        }
    }

    function deleteUser(event){
        if (!inputUserID.value) {
            alert("Write user's id")
            return;
        }

        if (event && event.target) {
            event.target.disabled = true;
            request(methods.delete, `${window.env.host}/api/user/${state.userID}`, getToken("token"))
            .then(response => {
                alert(response.message);
                cleanProducts();
                state.users = sortUsersID(state.users.filter(item => item.id !== +state.userID));
                state.users.map(item => adminContents.innerHTML += renderUserCard(item));
                event.target.disabled = false;
            })
        }
    }

    function getUserData(event){
        event.preventDefault();

        if (!inputUserID.value) {
            alert("Write user's id");
            return;
        }

        if (event && event.target) {
            event.target.disabled = true;
            request(methods.get, `${window.env.host}/api/user/${state.userID}`, getToken("token"))
            .then(response => {
                console.log(response);
                cleanProducts();
                adminContents.innerHTML = renderUserCard(response);
                event.target.disabled = false;
            })
            .catch(error => {
                alert(error.response.data.error)
                event.target.disabled = false;
            })
        }
    }

    function editProduct(event){
        if(!inputProductID.value || ((!inputProductName.value && !inputProducTitlte.value && !inputProductPrice.value))){
            alert("Be sure to fill in the 'id' fields, and one of the three fields below to change the product information!");
            return;
        }
        if(event && event.target){
            event.target.disabled = true;
            changeData(`${window.env.host}/api/products/${state.id}`, JSON.stringify({name: state.name, price: state.price, title: state.title}), getToken("token"))
            .then(response => {
                event.target.disabled = false;
                alert(response.data.message);
                cleanProducts();
                getAllProductsButton.click();
            });
        }
    }

    function deleteProduct(event){
        if(!inputProductID.value){
            alert("Write user's id");
            return;
        }

        if(event && event.target){
            event.target.disabled = true;
            request(methods.delete, `${window.env.host}/api/products/${state.id}`, getToken("token"))
            .then(response => {
                alert(response.message);
                cleanProducts();
                state.products = state.products.toSorted((a, b) => a.id - b.id).filter(item => item.id !== +state.id)
                state.products.map(item => {
                    adminContents.innerHTML += renderProductCard(item);
                })
                event.target.disabled = false;
            });
        }
    }

    function cleanProducts() {
        adminContents.textContent = "";
    }

    getAllProductsButton.addEventListener("click", getAllProducts.bind(this));
    getAllUsersButton.addEventListener("click", getAllUsers.bind(this));
    deleteUserButton.addEventListener("click", deleteUser.bind(this));
    findUserButton.addEventListener("click", getUserData.bind(this));

    editProductButton.addEventListener("click", editProduct.bind(this));
    deleteProductButton.addEventListener("click", deleteProduct.bind(this));
})