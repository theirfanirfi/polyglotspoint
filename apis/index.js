import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64'

const BASE_URL = "http://192.168.10.6:5000/";

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
