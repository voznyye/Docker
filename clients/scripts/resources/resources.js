const axios = require('axios').default;
import getToken from "../verification/verification";

async function uploadFile(url, data, header = getToken("token")) {
    const result = await fetch(url, {
        headers: {
            ...header
        },
        method: "POST",
        body: data,
    });

    if(!result.ok && result.status === 500){
        throw new Error(result.statusText);
    }

    return await result.json();
}

async function postRequest(url, data, header = getToken("token")) {

    const result = await axios(url, {
        method: "post",
        data,
        },
        {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                ...header
            }
        })
    return result;
}   

async function request(method, url, header){

    if(!getToken("token")){
        alert("Вы не зарегстрированы или не авторизованы");
        return;
    }

    const result = await axios(url, {
        method: method,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            ...header
        }
    })
    return result.data;
}

async function changeData(url, data, header){
    if(!getToken("token")){
        alert("Вы не зарегистрированы или не авторизованы");
        return;
    }

    const result = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            ...header
        }
    })

    if(result.status === 500){
        throw new Error(result.statusText);
    }
    
    return await result.json();
}


export {request, postRequest, changeData, uploadFile};
