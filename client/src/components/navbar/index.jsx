import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/base";
import "./index.css";

export default function index() {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");

  const toggleNavbar = () => {
    setIsNavbarActive(!isNavbarActive);
  };

  const closeNavbar = () => {
    setIsNavbarActive(false);
  };

  const handleLogout = async () => {
    try {
      const res = await api.get("auth/logout");
      console.log(res.data);
      localStorage.removeItem("TOKEN");
      alert("Logged out successfully!");
      navigate("/");
      closeNavbar();
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className={`App ${isNavbarActive ? "active" : ""}`}>
      <header
        className="header flex"
        style={{
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="navbar-heading" onClick={closeNavbar}>
          TEN Actors
        </div>

        <nav className={`navbar ${isNavbarActive ? "active" : ""}`}>
          <ul className="navbar-list">
            <Link className="navbar-link" to="/" onClick={closeNavbar}>
              Home
            </Link>
            <Link className="navbar-link" to="/Actors" onClick={closeNavbar}>
              Actors
            </Link>

            {!token ? (
              <div className="navbar-buttons">
                <Link to="/auth/login" onClick={closeNavbar}>
                  <button className="login-btn" style={{cursor: "pointer"}}>
                    Log in
                  </button>
                </Link>
                <Link to="/auth/register" onClick={closeNavbar}>
                  <button className="signup-btn" style={{cursor: "pointer"}}>
                    Register
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-4 justify-center items-center">
                {/* <Link to={`/profile/${user.id}`} onClick={closeNavbar}>
                  <p className="text-white text-md">{user.name}</p>
                </Link> */}
                <button
                  className="text-md py-1 px-4 bg-gray-500 text-white"
                  style={{cursor: "pointer"}}
                  onClick={handleLogout}
                >
                  LogOut
                </button>
              </div>
            )}
          </ul>
        </nav>

        <div className="mobile-navbar-btn" onClick={toggleNavbar}>
          <div className={`toggle_btn ${isNavbarActive ? "open" : ""}`}></div>
        </div>
      </header>
    </div>
  );
}
