import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import { AppContent } from "./AppContent";

import { AdminLayout } from "./admin/AdminLayout";
import { ManageRestaurants } from "./admin/pages/ManageRestaurants";
import { ViewRestaurant } from "./admin/pages/ViewRestaurant";
import { ManageCategory } from "./admin/pages/ManageCategory";
import { ManageUsers } from "./admin/pages/ManageUsers";
import { Dashboard } from "./admin/pages/Dashboard";
import { Orders } from "./admin/pages/Orders";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" />

          <Routes>
            <Route path="/*" element={<AppContent />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="restaurants" element={<ManageRestaurants />} />
              <Route path="orders" element={<Orders />} />
              <Route path="restaurant/:id" element={<ViewRestaurant />} />
              <Route path="view_category" element={<ManageCategory />} />
              <Route path="users" element={<ManageUsers />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
