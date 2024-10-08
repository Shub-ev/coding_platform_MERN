import { createContext, useState } from "react";

// create context
const AuthContext = createContext();

// create provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async (userData) => {
        try {
            const response = await fetch('http://localhost:8080/user/coding_platform/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const res = await response.json();
            if (res.success) {
                setUser(res.user);
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
            const response = await fetch("http://localhost:8080/user/coding_platform/createUser", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const res = await response.json();
            if (res.success) {
                setUser(res.user);
            }
            return res;
        }
        catch (error) {
            console.error(error);
            setError(error);
            return error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;