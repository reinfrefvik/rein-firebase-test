import { Link } from "react-router-dom";
import { Login } from "../components/login";

const HomePage = () => {
    return (
        <div>
            <h1>content</h1>
            <Link to="/magicitems">Magic Items</Link>
            <Login />
        </div>
    )
}

export {HomePage};