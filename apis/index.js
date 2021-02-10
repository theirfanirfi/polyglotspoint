import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64'

const BASE_URL = "http://192.168.0.106:5000/";
// const BASE_URL = "https://polglotpoints.herokuapp.com/"

export const getData = async () => {
    try {
        let value = await AsyncStorage.getItem('user')
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

export const getToken = async () => {
    try {
        let value = await AsyncStorage.getItem('user')
        if (value !== null) {
            let user = await JSON.parse(value);
            let token = await base64.encode(user.token);
            console.log(token)
            return token
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

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
    let token = await getToken();
    console.log(token);
    let response = await fetch(BASE_URL + 'api/' + url, {
        headers:
            { "Authorization": token }
    })
    let jsonResponse = await response.json();
    return jsonResponse;
}

export const get_withParam = async (url, token) => {
    let response = await fetch(BASE_URL + 'api/' + url, {
        headers:
            { "Authorization": token }
    })
    let jsonResponse = await response.json();
    return jsonResponse;
}

export const get_noParam = async (url) => {
    let response = await fetch(BASE_URL + 'api/' + url)
    let jsonResponse = await response.json();
    return jsonResponse;
}

export const post = async (url, form, token) => {
    let response = await fetch(BASE_URL + 'api/' + url,
        {
            method: 'POST',
            body: form,
            headers: {
                "Authorization": token
            }
        })
    let jsonResponse = await response.json();
    return jsonResponse;
}
