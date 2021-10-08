import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {

    const [cart, setCart] = useState({
        itens: '',
        email: '',
        senha: '',
        endereco: '',
    });
    useEffect(() => {
        const userStorage = localStorage.getItem('user');
        if(userStorage) {
            setCart(JSON.parse(userStorage))
        } else {
            setCart({
                name: '',
                email: '',
                senha: '',
                endereco: '',
            })
        }
    }, [])
    return (
        <AuthContext.Provider value={{ cart, setCart }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext);