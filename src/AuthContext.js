import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from './Component/Controller/Login/auth';

const AuthContext = createContext({
    data: null,
    login: () => {},
    logout: () => {},
    refreshData: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const loginForm = String(window.location.href).split('/').includes('login');

    const loginChecker = () => {
        auth.isAuthenticated()
        .then((res) => {
            if (res.data.isAuthenticated) {
                setData(res.data.data.data);
            } 
        })
        .catch((err) => {
            alert(err.message);
            setData(null);
        });
    }

    const logout = () => {
        setData(null); // Reset data upon logout
    };

    const login = (userData) => {
        setData(userData); // Set data upon login
    };

    useEffect(() => {
        loginChecker()
    }, [])


    // Ensure children are only rendered when data is not null and not on login page
    if (!children || (data === null && !loginForm)) return null;

    return (
        <AuthContext.Provider value={{ data, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};







































/*import React, { createContext, useContext, useState } from 'react';
import auth from './Component/Controller/Login/auth';

// Initialize context with an initial value
const AuthContext = createContext({
    data: null,
    login: () => {},
    logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const loginForm = String(window.location.href).split('/').includes('login');

    auth.isAuthenticated().then((res) => {
        
        if (res.data.isAuthenticated) {
            if (data === null) {
                setData(res.data.data)
            }
        } 
    }).catch((err) => {
        console.error(err)
    })
    
    const logout = () => {
        setData(null); // Reset data upon logout
    };

    const login = (userData) => {
        setData(userData); // Set data upon login
    };

    if (!children) return null;

    return (
        data !== null && loginForm === false ? (
            <AuthContext.Provider value={{ data, login, logout }}>
                {children}
            </AuthContext.Provider>
        ) : loginForm ? 
            <AuthContext.Provider value={{ data, login, logout }}>
                {children}
            </AuthContext.Provider>
        : null
    );
};

*/