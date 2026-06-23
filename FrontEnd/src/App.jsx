import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import { AppContent } from "./AppContent";

import { ManageRestaurants } from "./admin/pages/ManageRestaurants";
import { ViewRestaurant } from "./admin/pages/ViewRestaurant";
import { ManageCategory } from "./admin/pages/ManageCategory";
import { ManageUsers } from "./admin/pages/ManageUsers";
import { Dashboard } from "./admin/pages/Dashboard";
import { AdminOrders } from "./admin/pages/AdminOrders";
import { RestaurantApplication } from "./admin/pages/RestaurantApplication";
import { AdminLayout } from "./admin/layout/AdminLayout";
import { RestaurantLayout } from "./admin/layout/RestaurantLayout";
import { RestaurantOrders } from "./admin/pages/RestaurantOrders";
import { ManageRestaurantMenu } from "./admin/pages/ManageRestaurantMenu";
import { RestaurantDashboard } from "./admin/pages/RestaurantDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Unauthorized } from "./pages/auth/Unauthorized";
import { RestaurantProfile } from "./admin/pages/RestaurantProfile";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" />

          <Routes>
            <Route path="/*" element={<AppContent />} />

            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="restaurants" element={<ManageRestaurants />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="restaurant/:id" element={<ViewRestaurant />} />
              <Route path="view_category" element={<ManageCategory />} />
              <Route path="users" element={<ManageUsers />} />
              <Route
                path="restaurant-applications"
                element={<RestaurantApplication />}
              />
            </Route>

            <Route
              path="/restaurant"
              element={
                <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
                  <RestaurantLayout />
                </ProtectedRoute>
              }
            >
              <Route path="orders" element={<RestaurantOrders />} />
              <Route path="menu-item" element={<ManageRestaurantMenu />} />
              <Route path="dashboard" element={<RestaurantDashboard />} />
              <Route path="profile" element={<RestaurantProfile />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
