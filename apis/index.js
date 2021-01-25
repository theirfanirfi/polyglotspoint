const BASE_URL = "http://192.168.10.6:5000/";

export const getLanuguageLessons = async (context, language_id) => {
    let response = await fetch(BASE_URL + 'api/lessons/')
    let jsonResponse = await response.json();
    return jsonResponse;
}