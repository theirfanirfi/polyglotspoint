const BASE_URL = "http://192.168.10.6:5000/";
export const getAPIBaseUrl = () => {
    return BASE_URL + 'api/';
}

export const getBaseUrl = () => {
    return BASE_URL;
}
export const getLanuguageLessons = async (context, language_id) => {
    let response = await fetch(BASE_URL + 'api/lessons/')
    let jsonResponse = await response.json();
    return jsonResponse;
}

export const get = async (url) => {
    let response = await fetch(BASE_URL + 'api/' + url)
    let jsonResponse = await response.json();
    return jsonResponse;
}