import { useState } from "react";
import { Modal, Button, Form, Row, Col, Image, Card } from "react-bootstrap";

export const EditRestaurant = ({
  show,
  handleClose,
  restaurant,
  handleRestaurantChange,
  handleSaveRestaurant,
}) => {
  const [restaurantPreview, setRestaurantPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  if (!restaurant) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Edit Restaurant</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Card className="mb-4">
          <Card.Header className="fw-bold">Basic Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Restaurant Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={restaurant.name || ""}
                    onChange={(e) =>
                      handleRestaurantChange("name", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={restaurant.email || ""}
                    onChange={(e) =>
                      handleRestaurantChange("email", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={restaurant.phoneNumber || ""}
                    onChange={(e) =>
                      handleRestaurantChange("phoneNumber", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={restaurant.address || ""}
                    onChange={(e) =>
                      handleRestaurantChange("address", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={restaurant.description || ""}
                    onChange={(e) =>
                      handleRestaurantChange("description", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header className="fw-bold">Restaurant Timing</Card.Header>
          <Card.Body>
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Open Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={restaurant.openTime || ""}
                    onChange={(e) =>
                      handleRestaurantChange("openTime", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Close Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={restaurant.closeTime || ""}
                    onChange={(e) =>
                      handleRestaurantChange("closeTime", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Start</Form.Label>
                  <Form.Control
                    type="time"
                    value={restaurant.startTime || ""}
                    onChange={(e) =>
                      handleRestaurantChange("startTime", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery End</Form.Label>
                  <Form.Control
                    type="time"
                    value={restaurant.endTime || ""}
                    onChange={(e) =>
                      handleRestaurantChange("endTime", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header className="fw-bold">Location</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="number"
                    value={restaurant.latitude || ""}
                    onChange={(e) =>
                      handleRestaurantChange("latitude", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="number"
                    value={restaurant.longitude || ""}
                    onChange={(e) =>
                      handleRestaurantChange("longitude", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header className="fw-bold">Restaurant Images</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6} className="text-center">
                <Form.Group className="mb-3">
                  <Form.Label>Restaurant Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setRestaurantPreview(URL.createObjectURL(file));
                        handleRestaurantChange("restaurantPhoto", file);
                      }
                    }}
                  />
                </Form.Group>

                {(restaurantPreview || restaurant.restaurantPhoto) && (
                  <Image
                    src={
                      restaurantPreview ||
                      `data:image/jpeg;base64,${restaurant.restaurantPhoto}`
                    }
                    rounded
                    style={{
                      width: "200px",
                      height: "140px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Col>

              <Col md={6} className="text-center">
                <Form.Group className="mb-3">
                  <Form.Label>Cover Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setCoverPreview(URL.createObjectURL(file));
                        handleRestaurantChange("coverPhoto", file);
                      }
                    }}
                  />
                </Form.Group>

                {(coverPreview || restaurant.coverPhoto) && (
                  <Image
                    src={
                      coverPreview ||
                      `data:image/jpeg;base64,${restaurant.coverPhoto}`
                    }
                    rounded
                    style={{
                      width: "260px",
                      height: "140px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="success"
          onClick={() => {
            handleSaveRestaurant();
            handleClose();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
