import { createContext, useState } from "react";

// create context
const AuthContext = createContext();

// create provider component
export const AuthProvider = ({ children }) => {

    const login = async (userData) => {
        try {
            const response = await fetch('http://localhost:8080/user/coding_platform/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const res = await response.json();
            if (res.success) {
                console.log(res.user);
                localStorage.setItem("user", {
                    "user": res.user,
                })
            }
            return res;
        }
        catch (error) {
            console.error(error);
            setError(error);
            return error;
        }
    }

    const signup = async (userData) => {
        try {
            const response = await fetch("http://localhost:8080/user/coding_platform/auth/createUser", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const res = await response.json();
            if (res.success) {
                localStorage.setItem('user', res.user);
                // setUser(res.user);
            }
            return res;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }

    return (
        <AuthContext.Provider value={{ login, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;