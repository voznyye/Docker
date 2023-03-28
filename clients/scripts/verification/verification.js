
function getToken(key){
    if(!localStorage.getItem(key)){
        return "";
    }
    return {"token": localStorage.getItem(key)};
}


export default getToken;


