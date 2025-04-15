import "../Header.css"; // Import your CSS file
import burger_close from "../../../assets/burger_close.png";
import { routes } from "Routers";
import { Link } from "react-router-dom";
import { Login } from "components/login";

interface HeaderSidebarProps {
  user: any;
  showUserMenu: boolean;
  setShowUserMenu: (bool) => void;
}

const HeaderSidebar = (props: HeaderSidebarProps) => {
  return (
    <div className="user-menu">
      <div
        className="user-settings"
        onClick={() => props.setShowUserMenu(false)}
      >
        <div>
          {!!props.user ? props.user.displayName ?? "UserName" : "No User"}
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
          {routes.map((item) => {
            if (item.name === "home") return null;
            return (
              <Link
                key={item.name}
                className="nav-item"
                to={item.path}
                onClick={() => props.setShowUserMenu(false)}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="nav-item">
            <Login onClickAction={() => props.setShowUserMenu(false)} />
          </div>
        </div>
      ) : (
        <Link
          className="nav-item"
          to="login"
          onClick={() => props.setShowUserMenu(false)}
        >
          Log in
        </Link>
      )}
    </div>
  );
};

export { HeaderSidebar };
