import getToken from "../verification/verification";


async function postRequest(url, data, header = getToken("token")) {
    const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            ...header
        }
    })

    if(!result.ok && result.status === 500){
        throw new Error(result.statusText);
    }

    console.log(result);

    return await result.json();
}   

async function request(method, url, header){

    if(!getToken("token")){
        alert("Вы не зарегстрированы или не авторизованы");
        return;
    }

    const result = await fetch(url, {
        method: method,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            ...header
        }
    })

    return await result.json();

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

    console.log(result);
    
    return await result.json();
}


export {request, postRequest, changeData};

