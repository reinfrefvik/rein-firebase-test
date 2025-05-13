import { IconContext } from "react-icons";
import { FaTimesCircle } from "react-icons/fa";
import { routes } from "../../../Routers";
import { Link } from "react-router-dom";
import { Login } from "../../login";
import { useAuthUser } from "../../../contexts/useAuth";

interface HeaderSidebarProps {
  user: any;
  showUserMenu: boolean;
  setShowUserMenu: (bool) => void;
}
const itemStyle =
  "flex flex-row text-black cursor-pointer no-underline hover:text-gray-800 hover:text-shadow-sm p-2";

const HeaderSidebar = (props: HeaderSidebarProps) => {
  const user = useAuthUser();

  return (
    <div className="absolute top-0 right-0 min-w-[300px] bg-white flex flex-col items-stretch shadow-lg z-1000 h-screen">
      <div onClick={() => props.setShowUserMenu(false)}>
        <IconContext.Provider value={{ color: "black", size: "20px" }}>
          <div className="p-4 cursor-pointer flex flex-row justify-end">
            <FaTimesCircle />
          </div>
        </IconContext.Provider>
      </div>

      <div className="flex flex-col justify-start items-start">
        <div className="flex flex-row items-end justify-start gap-2 p-2 border-b-1 border-gray-300 w-full">
          {" "}
          {!!user
            ? user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-[40px] h-[40px] rounded-sm"
                />
              )
            : null}
          <div className="text-gray-700">
            {!!user ? user.displayName ?? "UserName" : "No User"}
          </div>
        </div>
        {!!props.user &&
          routes.map((item) => {
            if (item.name === "home") return null;
            return (
              <Link
                key={item.name}
                className={itemStyle}
                to={item.path}
                onClick={() => props.setShowUserMenu(false)}
              >
                {item.name}
              </Link>
            );
          })}
        {!!props.user && (
          <div className={itemStyle}>
            <Login onClickAction={() => props.setShowUserMenu(false)} />
          </div>
        )}
        {!props.user && (
          <Link
            className={itemStyle}
            to="login"
            onClick={() => props.setShowUserMenu(false)}
          >
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};

export { HeaderSidebar };
