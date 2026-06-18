import { Outlet } from "react-router-dom";

import { RestaurantSidebar } from "../../components/restaurant/RestaurantSidebar";
import { RestaurantNavbar } from "../../components/restaurant/RestaurantNavbar";

export const RestaurantLayout = () => {
  return (
    <div className="d-flex">
      <RestaurantSidebar />

      <div className="flex-grow-1">
        <RestaurantNavbar />

        <div className="p-4 bg-light min-vh-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
