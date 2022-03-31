import "./HeaderCommon.css"
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function HeaderCommon() {

    const navigate = useNavigate()

    return (

        <>

            <header className="header-welcome">

                <div className="header-group-1">
                    <span className="special-logo"><NavLink to = "/profile">VideoMania</NavLink></span>
                    <span><NavLink to = "../home">Home</NavLink></span>
                    <span><NavLink to = "../welcome">About Us</NavLink></span>
                </div>

                <div className="header-group-2">
                    <button>Login</button>
                    <button>Register</button>
                </div>

            </header>

        </>

    )
    
}