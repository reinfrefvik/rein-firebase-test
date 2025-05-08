// Header.tsx

import React, { useState } from "react";
import "./Header.css"; // Import your CSS file
import { useAuthUser } from "../../contexts/useAuth";
import { Link } from "react-router-dom";
import logo from "../../assets/fatrat_logo.png";
import burger_open from "../../assets/burger_open.png";
import burger_close from "../../assets/burger_close.png";
import { HeaderSidebar } from "./headerSidebar/headerSidebar";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const user = useAuthUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link to="/home">
        <img src={logo} alt="Fat Rat Logo" className="logo-img" />
      </Link>
      <div className="flex items-center gap-4" onClick={() => setShowUserMenu(true)}>
        <div className="text-gray-700"> {!!user ? user.displayName ?? "UserName" : "No User"} </div>
        {!!user
          ? user.photoURL && (
              <img src={user.photoURL} alt="user" className="user-img"/>
            )
          : null}
        <div className="flex items-center cursor-pointer">
          <img
            src={!showUserMenu ? burger_open : burger_close}
            alt="burger_menu"
          />
        </div>
      </div>
      {showUserMenu && (
        <HeaderSidebar
          user={user}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
        />
      )}
    </header>
  );
};

export { Header };
