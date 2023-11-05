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
}

export default requests;

