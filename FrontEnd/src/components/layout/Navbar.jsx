import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import foodfusion from "../../assets/foodfusion.webp";
import { useAuth } from "../../context/AuthContext";
import { AuthModal } from "../../pages/auth/AuthModel";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const { navigate } = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  const { cart } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light py-2 shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={foodfusion} alt="logo" style={{ width: "70px" }} />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0 gap-md-3">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " text-warning fw-semibold" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="/explore-menu" className="nav-link">
                Explore
              </a>
            </li>
            <li className="nav-item">
              <NavLink
                to="/all-restaurant"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " text-warning fw-semibold" : "")
                }
              >
                All Restaurant
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="#footer" className="nav-link">
                Contact Us
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <NavLink to="/cart">
                <IoCartOutline className="fs-5" />{" "}
                {cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                    style={{ fontSize: "12px" }}
                  >
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </div>

            {token ? (
              <button
                className="btn btn-danger rounded-pill px-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                className="btn btn-outline-warning rounded-pill px-4"
                onClick={() => setShowAuth(true)}
              >
                Sign in
              </Link>
            )}

            <AuthModal show={showAuth} handleClose={() => setShowAuth(false)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
