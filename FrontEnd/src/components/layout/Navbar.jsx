import { NavLink } from "react-router-dom";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import foodfusion from "../../assets/foodfusion.webp";

const Navbar = () => {
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
            <IoSearchSharp className="me-3 fs-5" />

            <div className="position-relative me-3">
              <NavLink to="/cart">
                <IoCartOutline className="fs-5" />
              </NavLink>
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
