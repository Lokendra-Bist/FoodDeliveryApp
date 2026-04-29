import { useAuth } from "./context/AuthContext";
import { AuthModal } from "./pages/auth/AuthModel";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import { Home } from "./pages/Home";
import { Restaurant } from "./pages/restaurant/Restaurant";
import { RestaurantDetail } from "./components/restaurant/RestaurantDetail";
import { AddRestaurant } from "./pages/restaurant/AddRestaurant";
import { AddMenu } from "./pages/menu/AddMenu";
import { MenuList } from "./pages/menu/MenuList";
import { Cart } from "./pages/cart/Cart";

export const AppContent = () => {
  const { showAuthModal, closeAuthModal } = useAuth();

  return (
    <>
      <AuthModal show={showAuthModal} handleClose={closeAuthModal} />

      <Navbar />

      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-restaurant" element={<Restaurant />} />
          <Route path="/restaurant-detail/:id" element={<RestaurantDetail />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/explore-menu" element={<MenuList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};
