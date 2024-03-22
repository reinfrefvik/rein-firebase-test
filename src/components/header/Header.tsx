// Header.tsx

import React, { useContext, useState } from 'react';
import './Header.css'; // Import your CSS file
import { AuthContext } from '../../contexts/authContexts';
import { Login } from '../login';
import { Link } from 'react-router-dom';
import logo from '../../assets/fatrat_logo.png';

interface HeaderProps {
  
}

interface NavbarItem {
  id: number;
  title: string;
  navLink?: string;
  expand: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  const {user} = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const navbarItems: NavbarItem[] = [
    { id: 1, title: 'Home', navLink: '/', expand: false },
    { id: 2, title: 'Profile', navLink:'/profile', expand: false },
    { id: 3, title: 'Rooms', expand: true },
  ];

  const toggleUserMenu = () => {
    console.log('toggleUserMenu');
    setShowUserMenu(!showUserMenu);
    console.log(showUserMenu);
  };

  const handleNavbarItemClick = (id: number) => {
    const item = navbarItems.find((item) => item.id === id);
    if (item) {
      if(item.expand === false || item.id === expandedItems[0]) {
        setExpandedItems([]);
      } else {
        setExpandedItems([id]);
      }
    } else {
      setExpandedItems([]);
    }
  }

  // console.log(user.photoURL)
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Fat Rat Logo" className="logo-img" />
        <h1 className="logo">FATRAT</h1>
      </div>
      <div className="nav">
        <div className="nav-items">
          {navbarItems.map((item) => (
            <div className="nav-item" key={item.id} onClick={() => handleNavbarItemClick(item.id)}>
              { item.navLink ? 
                <Link className="nav-link" to={item.navLink}>{item.title}</Link>
                :
                <span>{item.title}</span>
                }
              </div>
              ))}
        </div>
        <div className={`sub-menu ${expandedItems.length > 0 ? 'expand' : 'collapse'}`}>
          <div className="sub-menu-item">Sub Menu Item 1</div>
        </div>
      </div>
      <div className="user-info">
        <div className="user-settings" onClick={toggleUserMenu}>
          {!! user ? 
            <>
              <div className='user-names'>
                <div className='user-displayname'> {user.displayName}</div>
                <div className='user-email'>{ user.email }</div>
              </div>
              <img className='user-img' src={!!user ? user.photoURL : 'https://picsum.photos/200'} alt="User" />
            </>
          :
          <span>Log in</span>
          }

        </div>
      </div>
      {showUserMenu && (
        <div className="user-menu">
          {!!user ? (
            <>
              <div className="user-menu-item">Profile</div>
              <div className="user-menu-item">Settings</div>
              <div className="user-menu-item"><Login/></div>
            </>
          ) : (
            <>
              <div className="user-menu-item"><Link to="login">Log in</Link></div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
