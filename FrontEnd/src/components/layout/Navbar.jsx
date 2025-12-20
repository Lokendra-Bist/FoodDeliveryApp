import { useState } from "react";
import { Link } from "react-router-dom";
import foodfusion from "../../assets/foodfusion.webp";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <nav className="navbar navbar-expand-md py-2  ">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={foodfusion} alt="logo" style={{ width: "70px" }} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0 gap-md-3">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  menu === "home" ? "active text-warning fw-semibold" : ""
                }`}
                onClick={() => setMenu("home")}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <a
                href="#explore-menu"
                className={`nav-link ${
                  menu === "menu" ? "active text-warning fw-semibold" : ""
                }`}
                onClick={() => setMenu("menu")}
              >
                Menu
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#app-download"
                className={`nav-link ${
                  menu === "mobile-app" ? "active text-warning fw-semibold" : ""
                }`}
                onClick={() => setMenu("mobile-app")}
              >
                Mobile App
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#footer"
                className={`nav-link ${
                  menu === "contact-us" ? "active text-warning fw-semibold" : ""
                }`}
                onClick={() => setMenu("contact-us")}
              >
                Contact Us
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-4">
            <IoSearchSharp />

            <div className="position-relative">
              <Link to="/cart">
                <IoCartOutline />
              </Link>

              {/* {totalQuantity > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                  style={{ fontSize: "12px" }}
                >
                  {totalQuantity}
                </span>
              )} */}
            </div>

            <button className="btn btn-outline-warning rounded-pill px-4">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
