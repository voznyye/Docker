
function getToken(key){
    if(!localStorage.getItem(key)){
        return "";
    }
    return {"token": localStorage.getItem(key)};
}

function updateLocalStorage(key, value){
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
}


export default getToken;
export {updateLocalStorage};


