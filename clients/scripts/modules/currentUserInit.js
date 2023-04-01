import {renderUserProfileBlock} from "../component/userProfileBlock";

function currentUserInit() {
    if (localStorage && localStorage.getItem('user_id')) {
        let block = document.getElementsByClassName('header__buttons')
        if (block.length) {
            block[0].innerHTML = renderUserProfileBlock();

            document.getElementById("logout").addEventListener("click", () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                localStorage.removeItem("user_name");
                location.href = 'home.html';
            })
        }
    }
}


export {currentUserInit};