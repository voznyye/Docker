import {changeData, request} from "../resources/resources";
import getToken from "../verification/verification";
import {cleanInputs} from "./cleaner";
import {bindInput} from "./bindFunc";
import {renderUserCard, sortUsersID} from "./render";


function requests() {
    const idInput = document.getElementById("user-id"),
        nameInput = document.getElementById("user-name"),
        passwordInput = document.getElementById("user-password"),

        getOneUserButton = document.getElementById("get-one"),
        getAllUsersButton = document.getElementById("get-all"),
        changeUserDataButton = document.getElementById("change-data"),
        deleteUserButton = document.getElementById("delete"),

        userBox = document.getElementById("user-box");

    // магический строк 
    const methods = {
        get: "GET",
        delete: "DELETE"
    }

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

    function getUsersData(event) {
        if (event && event.target) {
            request(methods.get, window.env.host + '/api/user/', getToken("token"))
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
                console.log(response);
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
                console.log(state.usersData);
                cleanThisState();
                cleanInputs("userInputs");
            })
        }
    }

    function changeUserData(event){
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
                const timerID = setTimeout(function delay(){
                    if(response){
                        if(response.error){
                            clearInterval(timerID);
                            alert(response.message);
                        } else {
                            clearInterval(timerID);
                            alert(response.message);
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
                        }
                    } else {
                        setTimeout(delay, 4000);
                    }
                }, 4000)

            })
        }
    }
                                                                // this = event в данном случае. event объект события передается в getElementuser()
    getAllUsersButton.addEventListener("click", getUsersData.bind(this));

    getOneUserButton.addEventListener("click", getUserData.bind(this));

    deleteUserButton.addEventListener("click", deleteUser.bind(this));

    changeUserDataButton.addEventListener("click", changeUserData.bind(this));
}

export default requests;

