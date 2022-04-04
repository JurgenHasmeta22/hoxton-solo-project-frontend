import "./HeaderCommon.css"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../../../Zustand/store";

export default function HeaderCommon() {

    const navigate = useNavigate()
    const { user, setUser } = useStore()

    function handleLogOut(e: any) {
        e.preventDefault();
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    }

    function redirectToProfile(user: any) {
        navigate(`../users/${user.id}`);
    }

    return (

        <>

            <header className="header-welcome">

                <div className="header-group-1">
                    <span className="special-logo"><NavLink to = "../home">VideoMania</NavLink></span>
                    <span><NavLink to = "../home">Home</NavLink></span>
                    <span><NavLink to = "../welcome">About Us</NavLink></span>
                </div>

                <div className="header-group-2">

                    { user === null ? (

                        <>
                            <button><NavLink to = "../login">Login</NavLink></button>
                            <button><NavLink to = "../register">Register</NavLink></button>
                        </>

                    ): (

                        <div className="dropdown">

                            <li
                                className="dropbtn"
                                onClick={function () {
                                    redirectToProfile(user);
                            }}
                            >

                            <img src={`http://localhost:4000/avatar/${user?.userName}`} />
                                {user.userName}
                            </li>
                
                            <div className="dropdown-content">

                            <button
                                className="log-out"
                                onClick={function (e) {
                                handleLogOut(e);
                                }}
                            >
                                <span>Log Out</span>

                            </button>

                            </div>

                        </div>

                    )}

                </div>

            </header>

        </>

    )
    
}