import {createContext, useContext, useEffect, useState} from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    userName: null,
    notification: null,
    setNotification: () => {},
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState({});
    const [userName, _setUsername] = useState({});
    // const [token, _setToken] = useState(123);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token, user) => {
        _setToken(token)
        _setUsername(user)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
            localStorage.setItem('USER', user)
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('USER');
        }
     }
     //
     // const setUsername = ( user ) => {
     //    console.log('Hite', user)
     //    _setUsername(user);
     //    console.log(userName);
     //    if (username) {
     //        localStorage.getItem('USER', username);
     //    }
     //    else {
     //        localStorage.removeItem('USER');
     //    }
     // }

    const setNotification = message => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            userName,
            notification,
            setNotification,
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);
