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

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-restaurant" element={<Restaurant />} />
          <Route path="/restaurant-detail/:id" element={<RestaurantDetail />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/explore-menu" element={<MenuList />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
