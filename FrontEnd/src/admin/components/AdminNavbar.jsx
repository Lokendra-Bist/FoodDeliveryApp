import { Navbar, Container, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminNavbar = () => {
  const { logout } = useAuth();
  const { navigate } = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="light" className="border-bottom px-3">
      <Container fluid>
        <Navbar.Brand className="fw-bold">Food Delivery Admin</Navbar.Brand>

        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};
