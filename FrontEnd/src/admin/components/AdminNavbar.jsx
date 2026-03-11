import { Navbar, Container, Button } from "react-bootstrap";

export const AdminNavbar = () => {
  return (
    <Navbar bg="light" className="border-bottom px-3">
      <Container fluid>
        <Navbar.Brand className="fw-bold">Food Delivery Admin</Navbar.Brand>

        <Button variant="outline-danger" size="sm">
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};
