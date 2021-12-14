const backURL = 'https://manufactura-dev-api.azurewebsites.net/api/';

export async function asyncData(endPoint = '', method = 'GET', data, query = {}, credentials = 'same-origin', headers = { 'Content-Type': 'application/json' }) {
    // Default options are marked with *
    const response = await fetch(backURL + endPoint + new URLSearchParams(query), {
        method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials, // include, *same-origin, omit
        headers,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data ? JSON.stringify(data) : null
    });
    return response.json();
}

export async function asyncMultipartPostData(endPoint = '', data, method = 'POST', query = {}, credentials = 'same-origin', headers = { 'Content-Type': 'multipart/form-data' }) {
    const formData = new FormData();
    for (const name in data) {
        formData.append(name, data[name]);
    }
    const response = await fetch(backURL + endPoint + new URLSearchParams(query), {
        method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials, // include, *same-origin, omit
        headers,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data ? formData : null
    });
    return response.json();
}