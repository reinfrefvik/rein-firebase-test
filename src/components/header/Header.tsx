// Header.tsx

import React, { useContext, useEffect, useState } from 'react';
import './Header.css'; // Import your CSS file
import { AuthContext } from '../../contexts/authContexts';
import { Login } from '../login';
import { Link } from 'react-router-dom';
import logo from '../../assets/fatrat_logo.png';
import burger_open from '../../assets/burger_open.png';
import burger_close from '../../assets/burger_close.png';

interface HeaderProps {
  
}

interface NavbarItem {
  id: number;
  title: string;
  navLink: string;
}

const Header: React.FC<HeaderProps> = () => {
  const {user} = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navbarItems: NavbarItem[] = [
    { id: 1, title: 'Home', navLink: '/',},
    { id: 2, title: 'Profile', navLink:'/profile' },
    { id: 3, title: 'Items', navLink:'/magicitems' },
  ];

  const toggleUserMenu = () => {
    console.log('toggleUserMenu');
    setShowUserMenu(!showUserMenu);
    console.log(showUserMenu);
  };

  return (
    <header className="header">
      <Link className="logo-container" to="/">
        <img src={logo} alt="Fat Rat Logo" className="logo-img" />
      </Link>
      <div className="user-settings" onClick={toggleUserMenu}>
        <div> {!!user ? (user.displayName ?? "UserName") : "No User"} </div>
        <div className="burger_menu_container">
          <img src={!showUserMenu ? burger_open : burger_close} alt="burger_menu" className="burger_menu_icon"/>
        </div>
      </div>
      {showUserMenu && (
        <div className="user-menu">
          {!!user ? (
            <div className="nav-items">
              {navbarItems.map((item) => (
                <Link key={item.id} className='nav-item' to={item.navLink}>{item.title}</Link>
              ))}
              <div className='nav-item'><Login/></div>
            </div>
          ) : (
            <Link className='nav-item' to="login">Log in</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
