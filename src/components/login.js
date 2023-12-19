import React from 'react';
import { useCookies } from 'react-cookie';


const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const onClickAction = () => {
        if(!cookies.token) {
            setCookie('token', 'test1234');
        } else {
            removeCookie('token');
        }

    }
    return (
        <div>
            <span style={{display: "flex", alignItems: "center"}} onClick={onClickAction}> {!cookies.token ? 'Login' : 'Logout'}</span>
        </div>
    )
};

export {Login};