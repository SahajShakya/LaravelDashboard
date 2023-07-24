import {Link} from "react-router-dom";
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";
import axiosClient from "../axiosClient.js";

export default function Login() {

    const [ errors, setErrors ] = useState();

    const emailRef = createRef()
    const passwordRef = createRef()

    const { setUser,setToken, notification, setNotification } = useStateContext()


    const onSubmit = ev => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setErrors('');
        axiosClient.post('/login', payload)
            .then(( {data} ) => {
                setUser(data.user);
                setToken(data.token, data.user.name);
                setNotification("User was login sucessfully");
            })
            .catch(error => {
                const response = error.response;
                if(response && response.status === 422) {
                    if(response.data.error) {
                        setErrors(response.data.errors);
                    }
                    else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }


    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    {
                        errors
                        &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
                </form>
            </div>
            {
                // Object.keys(notification).length > 0
                notification?.length > 0
                &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    )
}
