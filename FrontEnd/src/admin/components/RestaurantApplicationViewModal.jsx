import { Modal, Row, Col, Badge, Card } from "react-bootstrap";

import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export const RestaurantApplicationViewModal = ({
  show,
  handleClose,
  restaurant,
}) => {
  if (!restaurant) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0" />

      <Modal.Body className="p-0">
        <div className="position-relative">
          <img
            src={`data:image/jpeg;base64,${restaurant.coverPhoto}`}
            alt="Cover"
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
            }}
          />

          <div
            className="position-absolute start-50 translate-middle"
            style={{
              bottom: "-55px",
            }}
          >
            <img
              src={`data:image/jpeg;base64,${restaurant.restaurantPhoto}`}
              alt="Restaurant"
              className="rounded-circle border border-4 border-white shadow"
              style={{
                width: "110px",
                height: "110px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        <div className="px-4 pb-4" style={{ marginTop: "70px" }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-1">{restaurant.name}</h3>

            <Badge bg="warning" text="dark" pill>
              {restaurant.status}
            </Badge>

            <p className="text-muted mt-3 mb-0">{restaurant.description}</p>
          </div>

          <Row className="g-3">
            <Col md={6}>
              <Card className="border-0 bg-light h-100">
                <Card.Body>
                  <small className="text-muted">
                    <FaEnvelope className="me-2" />
                    Email
                  </small>

                  <div className="fw-semibold">{restaurant.email}</div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="border-0 bg-light h-100">
                <Card.Body>
                  <small className="text-muted">
                    <FaPhone className="me-2" />
                    Phone
                  </small>

                  <div className="fw-semibold">{restaurant.phoneNumber}</div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={12}>
              <Card className="border-0 bg-light">
                <Card.Body>
                  <small className="text-muted">
                    <FaMapMarkerAlt className="me-2" />
                    Address
                  </small>

                  <div className="fw-semibold">{restaurant.address}</div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="border-0 bg-light">
                <Card.Body>
                  <small className="text-muted">
                    <FaClock className="me-2" />
                    Opening Hours
                  </small>

                  <div className="fw-semibold">
                    {restaurant.openTime} - {restaurant.closeTime}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="border-0 bg-light">
                <Card.Body>
                  <small className="text-muted">📍 Coordinates</small>

                  <div className="fw-semibold">
                    {restaurant.latitude}, {restaurant.longitude}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};
