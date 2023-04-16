import {changeData} from "../resources/resources";
import getToken from "../verification/verification";
import {cleanInputs} from "./cleaner";
import {bindInput} from "./bindFunc";

function requests() {
    const  nameInput = document.getElementById("user-name"),
            passwordInput = document.getElementById("user-password"),
            changeUserDataButton = document.getElementById("change-data");

    const state = {
        name: "",
        password: "",
    };

    bindInput(state, nameInput);
    bindInput(state, passwordInput);

    function cleanThisState() {
        state.name = "",
        state.password = "";
    }

    function getID() {
        return localStorage.getItem("user_id");
    }

    function changeUserData(event){
        event.preventDefault();
        
        if (!state.name || !state.password) {
            alert("Нужно заполнить графы id, имя и пароль")
            return;
        }

        if (event && event.target) {
            changeData(`${window.env.host}/api/user/${getID()}`, {
                name: state.name,
                password: state.password
            }, getToken("token"))
            .then(response => {
                const timerID = setTimeout(function delay(){
                    if(response){
                        if(response.error){
                            clearInterval(timerID);
                            alert(response.message);
                        } else {
                            clearInterval(timerID);
                            alert(response.message);
                            cleanThisState();
                            cleanInputs("userInputs");
                            location.href="log-in.html";
                        }
                    } else {
                        setTimeout(delay, 4000);
                    }
                }, 4000)

            })
        }
    }

                                                                    // this = event в данном случае. event объект события передается в getElementuser()
    changeUserDataButton.addEventListener("click", changeUserData.bind(this));

    // For admin page
/*     getOneUserButton = document.getElementById("get-one"),
    getAllUsersButton = document.getElementById("get-all"),
    deleteUserButton = document.getElementById("delete"),

    userBox = document.getElementById("user-box"); */
    // For admin page
    /*     function getUsersData(event) {
        if (event && event.target) {
            request(methods.get, window.env.host + '/api/user/', getToken("token"))
            .then(response => {
                if (response.length > 0) {
                    state.usersData = response;
                    userBox.innerHTML = sortUsersID(state.usersData).map(item => renderUserCard(item));
                } else {
                    userBox.innerHTML = "Нет пользователей";
                }
            })
        }
    } 

    function getUserData(event){
        event.preventDefault();

        if (!state.id) {
            alert("напишите id пользователя");
            return;
        }

        if (event && event.target) {
            request(methods.get, `${window.env.host}/api/user/${state.id}`, getToken("token"))
            .then(response => {
                if (response.error) {
                    alert(response.error);
                    return;
                }
                userBox.innerHTML = renderUserCard(response);
            })
        }
    }

    function deleteUser(event){
        if (!state.id) {
            alert("напишите id пользователя")
            return;
        }

        if (event && event.target) {
            request(methods.delete, `${window.env.host}/api/user/${state.id}`, getToken("token"))
            .then(response => {
                alert(response.message);
                state.usersData = state.usersData.filter(item => item.id !== +state.id);
                userBox.innerHTML = sortUsersID(state.usersData).map(item => renderUserCard(item));
                cleanThisState();
                cleanInputs("userInputs");
            })
        }
    } */

    // For admin page
/*     getAllUsersButton.addEventListener("click", getUsersData.bind(this));

    getOneUserButton.addEventListener("click", getUserData.bind(this));

    deleteUserButton.addEventListener("click", deleteUser.bind(this)); */

}

export default requests;

