import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaClipboardList,
  FaUtensils,
  FaStore,
} from "react-icons/fa";

export const RestaurantSidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/restaurant/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Orders",
      path: "/restaurant/orders",
      icon: <FaClipboardList />,
    },
    {
      title: "Menu Items",
      path: "/restaurant/menu-item",
      icon: <FaUtensils />,
    },
    {
      title: "Restaurant Profile",
      path: "/restaurant/profile",
      icon: <FaStore />,
    },
  ];

  return (
    <div
      className="bg-dark text-white"
      style={{
        width: "260px",
        minHeight: "100vh",
      }}
    >
      <div className="p-4 border-bottom">
        <h4 className="fw-bold mb-0">FoodFusion</h4>
      </div>

      <div className="p-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `d-flex align-items-center gap-3 text-decoration-none p-3 rounded mb-2 ${
                isActive ? "bg-warning text-dark fw-bold" : "text-white"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
