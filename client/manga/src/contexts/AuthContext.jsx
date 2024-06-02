import { createContext, useEffect, useReducer } from "react";
import axios from 'axios';

const AuthContext = createContext();

let AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, user: action.payload, loading: false };
        case "LOGOUT":
            localStorage.removeItem('user');
            return { ...state, user: null, loading: false };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

const AuthContextProvider = ({ children }) => {
    let [state, dispatch] = useReducer(AuthReducer, {
        user: null,
        loading: true,
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/users/me');
                const user = res.data;
                if (user) {
                    dispatch({ type: 'LOGIN', payload: user });
                } else {
                    dispatch({ type: "LOGOUT" });
                }
            } catch (e) {
                dispatch({ type: "LOGOUT" });
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };
