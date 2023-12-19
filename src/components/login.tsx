import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContexts';


const Login = () => {
    const {user, signIn, signOut} = useContext(AuthContext);

    const onClickAction = () => {
        if(!user) {
            signIn('test@test.no', '123456');
        } else {
            signOut();
        }
    }

    return (
        <div>
            <span style={{display: "flex", alignItems: "center"}} onClick={onClickAction}> {!user ? 'Login' : 'Logout'}</span>
        </div>
    )
};

export {Login};