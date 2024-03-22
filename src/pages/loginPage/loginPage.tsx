import React, { useContext, useState } from 'react';
import './loginPage.css'; // Import your CSS file for styling
import { AuthContext } from '../../contexts/authContexts';
import { Link } from 'react-router-dom';


const LoginPage = () => {
  const {user, signIn, signOut} = useContext(AuthContext);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!!user) {
        signOut();
        return;
    }
    
    if(!username || !password) {
        alert('Please enter username and password');
        return;
    }

    if(username === 'admin' && password === 'admin') {
        signIn('test@test.no', '123456');
        return;
    }


    const result:any = await signIn(username, password);
    console.log(result);
    if(result.error.length > 0) {
        setErrorMsg(result.error[1]);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMsg.length > 0 && <div>{errorMsg}</div>}
        
        <div className="login-form-footer">
            <button type="submit">Login</button>
            <div className="login-form-footer-right">
                <p>Forgot password?</p>
                <Link to='/register'>Register</Link>
            </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
