import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import {useEffect} from "react";
import axiosClient from "../axiosClient.js";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification, setNotification } = useStateContext();

    const localUsername = localStorage.getItem('USER');
    console.log(notification)


    if (!token) {
        return <Navigate to="/login"/>
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout')
                    .then(() => {
                        setUser({});
                        setToken(null);
                        setNotification("User logout sucessfully")
                    })
    }

    useEffect(() => {
        axiosClient.get('/user')
                    .then(( {data}) => {
                        setUser(data);
                    });
    }, [])

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">DashBoard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        { localUsername }
                        <a href="#" className="btn-logout" onClick={onLogout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
                {
                    // Object.keys(notification).length > 0
                    notification?.length > 0
                        &&
                    <div className="notification">
                        {notification}
                    </div>
                }
            </div>
        </div>
    )
}
