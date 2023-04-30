const axios = require('axios').default;
import getToken from "../verification/verification";

async function uploadFile(url, data, header = getToken("token")) {
    // FormData - это и есть объект, и поэтому здесь data не нужно заворачивать в {}
    const result = await axios.post(url, data,
        {
            headers: {
                "Content-type": "multipart/form-data",
                ...header
            }
        }
    )

    return result
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

    const result = await axios.put(url, data, 
        {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                ...header
            }
        }
    )
    
    return result;
}


export {request, postRequest, changeData, uploadFile};
