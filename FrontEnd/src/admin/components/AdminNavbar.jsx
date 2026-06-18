import { Navbar, Container, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="light" className="border-bottom px-3 sticky-top">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand className="fw-bold">Food Delivery Admin</Navbar.Brand>

        <div className="d-flex align-items-center gap-2">
          <Link to="/" className="btn btn-primary btn-sm">
            Go to Home
          </Link>

          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};
