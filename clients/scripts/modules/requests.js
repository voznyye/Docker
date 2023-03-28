import { getDataRequest } from "../resources/resources";
import {postRequest} from "../resources/resources"
import getToken from "../verification/verification";
import { deleteUser } from "../resources/resources";
import { changeData } from "../resources/resources";
import {clean, cleanInputs} from "./cleaner";


function requests(state) {

    console.log("Hello requests");

    const signUPButton = document.getElementById("form-sign_up-button"),
        formNameInput = document.getElementById("form-name-input"),
        formPasswordInput = document.getElementById("form-password-input");



    // const getData = document.getElementById("get-data-button"),
    //     formLoginInput = document.getElementById("form-login-input"),
    //     formPasswordInput = document.getElementById("form-password-input"),
    //     // Войти
    //     signINButton = document.getElementById("form-sign_in-button"),
    //     // Регистрация
    //     signUPButton = document.getElementById("form-sign_up-button");
    //     formIDInput = document.getElementById("form-get_id-input"),
    //     getOneDataUser = document.getElementById("form-get_one_user-button"),
    //     deleteUserButton = document.getElementById("form-delete-button"),
    //     changeUserDataButton = document.getElementById("form-update-button");

    function bindInput(input){
        input.addEventListener("input", event => {
            state[event.target.name] = event.target.value;
            console.log(state);
        })
    }

    bindInput(formNameInput);
    bindInput(formPasswordInput);
    // bindInput(formIDInput);


    // getData.addEventListener("click", event => {

    //     if(event && event.target){
    //         getDataRequest('http://127.0.0.1/api/user/', getToken("token"))
    //         .then(response => {
    //             if(response.length > 0){
    //                 console.log(response);
    //                 document.getElementById('content').innerHTML = response.map(item => item.name);
    //             } else {
    //                 document.getElementById('content').innerHTML = "Нет пользователей";
    //             }
    //         })
    //     }
    // })

    // signINButton.addEventListener("click", event => {
    //     event.preventDefault();
    //     console.log(state);
    //     if(!state.name || !state.password){
    //         alert("Вы не зарегистрированы")
    //         return;
    //     }

    //     if(event && event.target){
    //         postRequest("http://127.0.0.1/api/login/", state, getToken("token"))
    //         .then(response => {
    //             if(response.error){
    //                 alert(response.error);
    //                 return;
    //             }
    //             window.open("./../../users.html");
    //             localStorage.removeItem("token");
    //             localStorage.setItem("token", response.hash);
    //         })
    //         .finally(() => {
    //             clean(state);
    //             cleanInputs();
    //             console.log(state);
    //         })
    //     }
    // })

    signUPButton.addEventListener("click", event => {
        event.preventDefault();

        if(!state.name || !state.password){
            alert("Заполните имя и пароль");
            return;
        }

        if(event && event.target){
            postRequest("http://127.0.0.1/api/user/", state, getToken("token"))
            .then(response => {
                console.log(response.message);
                window.open("file:///C:/OSPanel/domains/AEH-project/clients/log-in.html");
            })
        }
    })

    // getOneDataUser.addEventListener("click", event => {
    //     event.preventDefault();

    //     if(!state.id){
    //         alert("напишите id пользователя");
    //         return;
    //     }

    //     if(event && event.target){
    //         getDataRequest(`http://127.0.0.1/api/user/${state.id}`, getToken("token"))
    //         .then(response => {
    //             if(response.error){
    //                 alert(response.error);
    //                 return;
    //             }
    //             console.log(response);
    //             document.getElementById('content').innerHTML = response.name;
    //         })
    //     }

    // })

    // deleteUserButton.addEventListener("click", event => {  
    //     if(!state.id){
    //         alert("напишите id пользователя")
    //         return;
    //     }

    //     if(event && event.target){
    //         deleteUser(`http://127.0.0.1/api/user/${state.id}`, getToken("token"))
    //         .then(response => {
    //             console.log(response)
    //             clean(state);
    //             cleanInputs();
    //             console.log(state);
    //         })
    //     }
    // })

    // changeUserDataButton.addEventListener("click", event => {
    //     if(!state.id || !state.name || !state.password){
    //         alert("Нужно заполнить графы id, имя и пароль")
    //         return;
    //     }

    //     if(event && event.target){
    //         changeData(`http://127.0.0.1/api/user/${state.id}`, {name: state.name, password: state.password}, getToken("token"))
    //         .then(response => {
    //             console.log(response);
    //         })
    //     }

    // })

}

export default requests;