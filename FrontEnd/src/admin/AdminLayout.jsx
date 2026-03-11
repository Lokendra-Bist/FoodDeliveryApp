import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminNavbar } from "./components/AdminNavbar";

export const AdminLayout = () => {
  return (
    <Container fluid className="p-0">
      <AdminNavbar />

      <Row className="g-0">
        <Col xs={12} md={3} lg={2} className="bg-dark min-vh-100">
          <AdminSidebar />
        </Col>

        <Col xs={12} md={9} lg={10} className="p-4 bg-light">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
