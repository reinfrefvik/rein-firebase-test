// Header.tsx

import React, { useContext, useEffect, useState } from "react";
import "./Header.css"; // Import your CSS file
import { AuthContext } from "../../contexts/authContexts";
import { Login } from "../login";
import { Link } from "react-router-dom";
import logo from "../../assets/fatrat_logo.png";
import burger_open from "../../assets/burger_open.png";
import burger_close from "../../assets/burger_close.png";

interface NavbarItem {
  id: number;
  title: string;
  navLink: string;
}

interface SidebarProps {
  user: any;
  showUserMenu: boolean;
  navBarItems: NavbarItem[];
  setShowUserMenu: (bool) => void;
}

const Sidebar = (props: SidebarProps) => {
  const stuff: Stuffies = {
    id: 1,
    name: "name",
    description: "description",
    price: 1,
    img: "img",
  };
  
  return (
    <div className="user-menu">
      <div className="user-settings" onClick={() => props.setShowUserMenu(false)}>
        <div>
          {" "}
          {!!props.user ? props.user.displayName ?? "UserName" : "No User"}{" "}
        </div>
        <div className="burger_menu_container">
          <img
            src={burger_close}
            alt="burger_menu"
            className="burger_menu_icon"
          />
        </div>
      </div>
      {!!props.user ? (
        <div className="nav-items">
          {props.navBarItems.map((item) => (
            <Link key={item.id} className="nav-item" to={item.navLink}>
              {item.title}
            </Link>
          ))}
          <div className="nav-item">
            <Login />
          </div>
        </div>
      ) : (
        <Link className="nav-item" to="login">
          Log in
        </Link>
      )}
    </div>
  );
};

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { user } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navbarItems: NavbarItem[] = [
    { id: 1, title: "Home", navLink: "/" },
    { id: 2, title: "Profile", navLink: "/profile" },
    { id: 3, title: "Items", navLink: "/magicitems" },
  ];

  console.log("user", user);

  return (
    <header className="header">
      <Link className="logo-container" to="/home">
        <img src={logo} alt="Fat Rat Logo" className="logo-img" />
      </Link>
      <div className="user-settings" onClick={() => setShowUserMenu(true)}>
        <div> {!!user ? user.displayName ?? "UserName" : "No User"} </div>
        <div className="burger_menu_container">
          <img
            src={!showUserMenu ? burger_open : burger_close}
            alt="burger_menu"
            className="burger_menu_icon"
          />
        </div>
      </div>
      {showUserMenu && (
        <Sidebar
          user={user}
          showUserMenu={showUserMenu}
          navBarItems={navbarItems}
          setShowUserMenu={setShowUserMenu}
        />
      )}
    </header>
  );
};

export { Header };
