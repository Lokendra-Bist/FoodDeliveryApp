import { NavLink, useNavigate } from "react-router-dom";

import {
  IoCartOutline,
  IoRestaurantOutline,
  IoHomeOutline,
  IoReceiptOutline,
  IoLogOutOutline,
} from "react-icons/io5";

import { MdOutlineExplore } from "react-icons/md";

import { FiPhoneCall, FiLogIn } from "react-icons/fi";

import foodfusion from "../../assets/foodfusion.webp";

import { useAuth } from "../../context/AuthContext";

import { AuthModal } from "../../pages/auth/AuthModel";

import { useState } from "react";

import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { token, logout } = useAuth();

  const navigate = useNavigate();

  const [showAuth, setShowAuth] = useState(false);

  const { cart } = useCart();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 fw-medium px-2 ${
      isActive ? "text-warning" : "text-dark"
    }`;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-2">
        <div className="container">
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center gap-2"
          >
            <img
              src={foodfusion}
              alt="FoodFusion Logo"
              style={{
                width: "58px",
                height: "58px",
                objectFit: "cover",
              }}
            />

            <div>
              <h5 className="mb-0 fw-bold text-dark">FoodFusion</h5>

              <small className="text-muted">Delicious food delivered</small>
            </div>
          </NavLink>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <NavLink to="/" className={navLinkClass}>
                  <IoHomeOutline size={18} />
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/explore-menu" className={navLinkClass}>
                  <MdOutlineExplore size={18} />
                  Explore
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/all-restaurant" className={navLinkClass}>
                  <IoRestaurantOutline size={18} />
                  Restaurants
                </NavLink>
              </li>

              {token && (
                <li className="nav-item">
                  <NavLink to="/my-orders" className={navLinkClass}>
                    <IoReceiptOutline size={18} />
                    Orders
                  </NavLink>
                </li>
              )}

              <li className="nav-item">
                <a
                  href="#footer"
                  className="nav-link d-flex align-items-center gap-2 fw-medium text-dark"
                >
                  <FiPhoneCall size={17} />
                  Contact
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <NavLink to="/cart" className="position-relative text-dark">
                <IoCartOutline size={28} />

                {cart.length > 0 && (
                  <span
                    className="
                      position-absolute
                      top-0
                      start-100
                      translate-middle
                      badge
                      rounded-pill
                      bg-warning
                      text-dark
                    "
                    style={{ fontSize: "11px" }}
                  >
                    {cart.length}
                  </span>
                )}
              </NavLink>

              {token ? (
                <button
                  className="
                    btn
                    btn-dark
                    rounded-pill
                    px-4
                    d-flex
                    align-items-center
                    gap-2
                  "
                  onClick={handleLogout}
                >
                  <IoLogOutOutline size={18} />
                  Logout
                </button>
              ) : (
                <button
                  className="
                    btn
                    btn-warning
                    rounded-pill
                    px-4
                    d-flex
                    align-items-center
                    gap-2
                    text-dark
                    fw-semibold
                  "
                  onClick={() => setShowAuth(true)}
                >
                  <FiLogIn size={18} />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal show={showAuth} handleClose={() => setShowAuth(false)} />
    </>
  );
};

export default Navbar;
