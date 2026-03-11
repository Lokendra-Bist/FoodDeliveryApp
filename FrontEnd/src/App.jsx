import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { AddRestaurant } from "./pages/restaurant/AddRestaurant";
import { Restaurant } from "./pages/restaurant/Restaurant";
import { RestaurantDetail } from "./components/restaurant/RestaurantDetail";
import { AddMenu } from "./pages/menu/AddMenu";
import { MenuList } from "./pages/menu/MenuList";
import { AdminLayout } from "./admin/AdminLayout";

import "./index.css";
import { ManageRestaurants } from "./admin/pages/ManageRestaurants";
import { ViewRestaurant } from "./admin/pages/ViewRestaurant";

// Dummy admin pages (replace later)
const AdminDashboard = () => <h3>Admin Dashboard</h3>;
const AdminMenuItems = () => <h3>Manage Menu Items</h3>;
const AdminOrders = () => <h3>Manage Orders</h3>;

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <div className="app">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/all-restaurant" element={<Restaurant />} />
                  <Route
                    path="/restaurant-detail/:id"
                    element={<RestaurantDetail />}
                  />
                  <Route path="/add-restaurant" element={<AddRestaurant />} />
                  <Route path="/add-menu" element={<AddMenu />} />
                  <Route path="/explore-menu" element={<MenuList />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="restaurants" element={<ManageRestaurants />} />
          <Route path="menu-items" element={<AdminMenuItems />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="restaurant/:id" element={<ViewRestaurant />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
