import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AdminSidebar = () => {
  return (
    <div className="text-white p-3">
      <h5 className="fw-bold mb-4"> Admin Panel</h5>

      <Nav className="flex-column gap-2">
        <Nav.Link as={Link} to="/admin/dashboard" className="text-white">
          Dashboard
        </Nav.Link>

        <Nav.Link as={Link} to="/admin/restaurants" className="text-white">
          Restaurants
        </Nav.Link>

        <Nav.Link as={Link} to="/admin/view_category" className="text-white">
          Category
        </Nav.Link>

        <Nav.Link as={Link} to="/admin/orders" className="text-white">
          Orders
        </Nav.Link>

        <Nav.Link as={Link} to="/admin/users" className="text-white">
          Users
        </Nav.Link>

        <Nav.Link as={Link} to="/admin/settings" className="text-white">
          Settings
        </Nav.Link>
      </Nav>
    </div>
  );
};
