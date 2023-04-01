import {changeData, request} from "../resources/resources";
import getToken from "../verification/verification";
import {cleanInputs} from "./cleaner";
import {bindInput} from "./bindFunc";
import {renderUserCard, sortUsersID} from "./render";


function requests() {
    const idInput = document.getElementById("user-id"),
        nameInput = document.getElementById("user-name"),
        passwordInput = document.getElementById("user-password"),

        getOneUserButton = document.getElementById("get-one-user"),
        getAllUsersButton = document.getElementById("get-all-users"),
        changeUserDataButton = document.getElementById("change-user-data"),
        deleteUserButton = document.getElementById("delete-user"),

        userBox = document.getElementById("user-box");

    const state = {
        usersData: [],
        id: "",
        name: "",
        password: "",
    };

    bindInput(state, idInput);
    bindInput(state, nameInput);
    bindInput(state, passwordInput);

    function cleanThisState() {
        state.usersData = [];
        state.id = "";
        state.name = "",
            state.password = "";
    }

    getAllUsersButton.addEventListener("click", event => {

        if (event && event.target) {
            request("GET", window.env.host + '/api/user/', getToken("token"))
                .then(response => {
                    if (response.length > 0) {
                        state.usersData = response;
                        userBox.innerHTML = sortUsersID(state.usersData).map(item => renderUserCard(item));
                        console.log(state.usersData);
                    } else {
                        userBox.innerHTML = "Нет пользователей";
                    }
                })
        }
    })

    getOneUserButton.addEventListener("click", event => {
        event.preventDefault();

        if (!state.id) {
            alert("напишите id пользователя");
            return;
        }

        if (event && event.target) {
            request("GET", `${window.env.host}/api/user/${state.id}`, getToken("token"))
                .then(response => {
                    if (response.error) {
                        alert(response.error);
                        return;
                    }
                    console.log(response);
                    userBox.innerHTML = renderUserCard(response);
                })
        }
    })

    deleteUserButton.addEventListener("click", event => {
        if (!state.id) {
            alert("напишите id пользователя")
            return;
        }

        if (event && event.target) {
            request("DELETE", `${window.env.host}/api/user/${state.id}`, getToken("token"))
                .then(response => {
                    alert(response.message);
                    state.usersData = state.usersData.filter(item => item.id != state.id);
                    userBox.innerHTML = sortUsersID(state.usersData).map(item => renderUserCard(item));
                    console.log(state.usersData);
                    cleanThisState();
                    cleanInputs("userInputs");
                })
        }
    })

    changeUserDataButton.addEventListener("click", event => {
        if (!state.id || !state.name || !state.password) {
            alert("Нужно заполнить графы id, имя и пароль")
            return;
        }

        if (event && event.target) {
            changeData(`${window.env.host}/api/user/${state.id}`, {
                name: state.name,
                password: state.password
            }, getToken("token"))
                .then(response => {
                    console.log(response);
                    state.usersData = state.usersData.map(item => {
                        if (state.id == item.id) {
                            return {...item, name: state.name}
                        }
                        return item;
                    })
                    userBox.innerHTML = sortUsersID(state.usersData).map(item => renderUserCard(item));
                    cleanThisState();
                    cleanInputs("userInputs");
                })
        }

    })
}

export default requests;

