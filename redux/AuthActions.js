export const login = () => {
    return {
        type: 'login',
        payload: true,
    }
}

export const logout = () => {
    return {
        type: 'logout',
        payload: false
    }
}