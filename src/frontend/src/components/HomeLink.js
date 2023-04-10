import {React} from "react";
import {Link} from "react-router-dom";

export const HomeLink = () => {
    return (
        <Link to={`/`} className="HomePage-link">
            <h2>Home</h2>
        </Link>
    )
}