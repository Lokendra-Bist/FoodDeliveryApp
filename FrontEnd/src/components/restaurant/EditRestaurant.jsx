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
  const [errors, setErrors] = useState({});

  if (!restaurant) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!restaurant.name?.trim()) {
      newErrors.name = "Restaurant name is required";
    } else if (restaurant.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!restaurant.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(restaurant.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!restaurant.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^9\d{9}$/.test(restaurant.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit Nepal phone number";
    }

    if (!restaurant.address?.trim()) {
      newErrors.address = "Address is required";
    } else if (restaurant.address.trim().length < 5) {
      newErrors.address = "Address is too short";
    }

    if (!restaurant.description?.trim()) {
      newErrors.description = "Description is required";
    } else if (restaurant.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    const latitude = parseFloat(restaurant.latitude);
    const longitude = parseFloat(restaurant.longitude);

    if (isNaN(latitude)) {
      newErrors.latitude = "Latitude is required";
    } else if (latitude < -90 || latitude > 90) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    if (isNaN(longitude)) {
      newErrors.longitude = "Longitude is required";
    } else if (longitude < -180 || longitude > 180) {
      newErrors.longitude = "Longitude must be between -180 and 180";
    }

    if (!restaurant.openTime) {
      newErrors.openTime = "Open time is required";
    }

    if (!restaurant.closeTime) {
      newErrors.closeTime = "Close time is required";
    } else if (
      restaurant.openTime &&
      restaurant.closeTime <= restaurant.openTime
    ) {
      newErrors.closeTime = "Close time must be after open time";
    }

    if (!restaurant.startTime) {
      newErrors.startTime = "Delivery start time is required";
    }

    if (!restaurant.endTime) {
      newErrors.endTime = "Delivery end time is required";
    } else if (
      restaurant.startTime &&
      restaurant.endTime <= restaurant.startTime
    ) {
      newErrors.endTime = "Delivery end time must be after start time";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

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
                    isInvalid={!!errors.name}
                    onChange={(e) =>
                      handleRestaurantChange("name", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={restaurant.email || ""}
                    isInvalid={!!errors.email}
                    onChange={(e) =>
                      handleRestaurantChange("email", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={restaurant.phoneNumber || ""}
                    isInvalid={!!errors.phoneNumber}
                    onChange={(e) =>
                      handleRestaurantChange("phoneNumber", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={restaurant.address || ""}
                    isInvalid={!!errors.address}
                    onChange={(e) =>
                      handleRestaurantChange("address", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={restaurant.description || ""}
                    isInvalid={!!errors.description}
                    onChange={(e) =>
                      handleRestaurantChange("description", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
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
                    isInvalid={!!errors.openTime}
                    onChange={(e) =>
                      handleRestaurantChange("openTime", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.openTime}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Close Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={restaurant.closeTime || ""}
                    isInvalid={!!errors.closeTime}
                    onChange={(e) =>
                      handleRestaurantChange("closeTime", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.closeTime}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Start</Form.Label>
                  <Form.Control
                    type="time"
                    value={restaurant.startTime || ""}
                    isInvalid={!!errors.startTime}
                    onChange={(e) =>
                      handleRestaurantChange("startTime", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.startTime}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery End</Form.Label>
                  <Form.Control
                    type="time"
                    value={restaurant.endTime || ""}
                    isInvalid={!!errors.endTime}
                    onChange={(e) =>
                      handleRestaurantChange("endTime", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.endTime}
                  </Form.Control.Feedback>
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
                    isInvalid={!!errors.latitude}
                    onChange={(e) =>
                      handleRestaurantChange("latitude", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.latitude}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="number"
                    value={restaurant.longitude || ""}
                    isInvalid={!!errors.longitude}
                    onChange={(e) =>
                      handleRestaurantChange("longitude", e.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.longitude}
                  </Form.Control.Feedback>
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
                    isInvalid={!!errors.restaurantPhoto}
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (!file) return;

                      if (!file.type.startsWith("image/")) {
                        setErrors((prev) => ({
                          ...prev,
                          restaurantPhoto: "Only image files are allowed",
                        }));
                        return;
                      }

                      if (file.size > 2 * 1024 * 1024) {
                        setErrors((prev) => ({
                          ...prev,
                          restaurantPhoto: "Image size must be less than 2MB",
                        }));
                        return;
                      }

                      setErrors((prev) => ({
                        ...prev,
                        restaurantPhoto: "",
                      }));

                      setRestaurantPreview(URL.createObjectURL(file));
                      handleRestaurantChange("restaurantPhoto", file);
                    }}
                  />
                  {errors.restaurantPhoto && (
                    <div className="text-danger small mt-1">
                      {errors.restaurantPhoto}
                    </div>
                  )}
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
                    isInvalid={!!errors.coverPhoto}
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (!file) return;

                      if (!file.type.startsWith("image/")) {
                        setErrors((prev) => ({
                          ...prev,
                          coverPhoto: "Only image files are allowed",
                        }));
                        return;
                      }

                      if (file.size > 2 * 1024 * 1024) {
                        setErrors((prev) => ({
                          ...prev,
                          coverPhoto: "Image size must be less than 2MB",
                        }));
                        return;
                      }

                      setErrors((prev) => ({
                        ...prev,
                        coverPhoto: "",
                      }));

                      setCoverPreview(URL.createObjectURL(file));
                      handleRestaurantChange("restaurantPhoto", file);
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
                {errors.coverPhoto && (
                  <div className="text-danger small mt-1">
                    {errors.coverPhoto}
                  </div>
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
            if (!validateForm()) {
              return;
            }

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
