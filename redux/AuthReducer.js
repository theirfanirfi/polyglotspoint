const initialState = {
    isLoggedIn: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                isLoggedIn: action.payload,
                isLoading: true,
            }
        case 'logout':
            return {
                ...state,
                isLoggedIn: action.payload,
                isLoading: true,
            }
        default:
            return state;
    }
}