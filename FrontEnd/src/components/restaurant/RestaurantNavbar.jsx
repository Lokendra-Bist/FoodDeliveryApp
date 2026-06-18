import { Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const RestaurantNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="white" className="shadow-sm border-bottom px-3">
      <Container fluid>
        <Navbar.Brand className="fw-bold">Restaurant Dashboard</Navbar.Brand>

        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-primary"
            size="sm "
            onClick={() => navigate("/")}
          >
            Go to Website
          </Button>

          <NavDropdown
            align="end"
            title={<FaUserCircle size={28} />}
            id="restaurant-profile"
          >
            <NavDropdown.Item>{user?.email}</NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item className="text-danger" onClick={handleLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};
