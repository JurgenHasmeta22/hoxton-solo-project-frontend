import { useNavigate } from "react-router-dom";
import { useStore } from "../../../Zustand/store";
import "./HeaderNewCommon.css";

export default function HeaderNewCommon() {
  const navigate = useNavigate();
  const { setUser, setSearchTerm, user } = useStore();

  function handleLogOut(e: any) {
    e.preventDefault();
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  function submitSearch(inputValue: any) {
    setSearchTerm(inputValue);
  }

  function redirectToHome() {
    navigate("../home");
  }

  function redirectToProfile(user: any) {
    navigate(`../users/${user.id}`);
  }

  return (
    <>
      <header className="header">
        <div className="header-sub-1">
          <div className="header-group-1">
            <span
              className="videoManiaLogo"
              onClick={() => {
                redirectToHome();
              }}
            >
              VideoMania
            </span>
          </div>
        </div>

        <div className="header-sub-2">
          <div className="header-group-2">
            <div className="button-search">
              <input
                type="search"
                name="q"
                placeholder="Search"
                aria-label="Search through site content"
              />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="header-sub-3">
          <div className="header-group-3">
            {user === null ? (
              <button
                onClick={function () {
                  navigate("../login");
                }}
              >
                <i className="material-icons special-icon">account_circle</i>
                Sign In
              </button>
            ) : (
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
        </div>
      </header>
    </>
  );
}
