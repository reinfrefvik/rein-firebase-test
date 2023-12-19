import React, { useContext, useState } from 'react';
import './Header.css'; // Import your CSS file
import { AuthContext } from '../../contexts/authContexts';

interface HeaderProps {
  onLogin: (username: string, password: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin }) => {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {user, signOut, signIn} = useContext(AuthContext);

  const toggleLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const handleLogin = () => {
    // Perform login logic or pass credentials to parent component
    signIn('test@test.no', '123456');

    // Reset fields and hide login menu
    setUsername('');
    setPassword('');
    setShowLoginMenu(false);
  };

  const LoginButton = () => {
    if (!user) {
      return <>
      <div className="login-button" onClick={toggleLoginMenu}>
        Login
      </div>
      {showLoginMenu && (
        <div className="login-menu">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </>;
    } else {
      return <div className="logout-button" onClick={signOut}>
      Logout
      </div>;
    }
  }
  return (
    <div className="header">
      <div className="logo">Your Logo</div>
      <LoginButton />
    </div>
  );
};

export default Header;
