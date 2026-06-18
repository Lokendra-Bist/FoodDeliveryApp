import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Button,
  Badge,
} from "react-bootstrap";

import toast from "react-hot-toast";

import { getRestaurantByOwner } from "../../api/restaurantApi";
import { EditRestaurant } from "../../components/restaurant/EditRestaurant";

export const RestaurantProfile = () => {
  const [restaurant, setRestaurant] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);

  const fetchRestaurant = async () => {
    try {
      const data = await getRestaurantByOwner();

      setRestaurant(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load restaurant");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!restaurant) {
    return <div className="text-center py-5">Restaurant not found</div>;
  }

  return (
    <Container fluid>
      <Card className="shadow-sm border-0 mb-4">
        <div
          style={{
            height: "260px",
            overflow: "hidden",
          }}
        >
          {restaurant.coverPhoto && (
            <img
              src={`data:image/jpeg;base64,${restaurant.coverPhoto}`}
              alt="Cover"
              className="w-100 h-100"
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>

        <Card.Body>
          <Row className="align-items-center">
            <Col md={2}>
              {restaurant.restaurantPhoto && (
                <img
                  src={`data:image/jpeg;base64,${restaurant.restaurantPhoto}`}
                  alt="Restaurant"
                  className="rounded-circle border shadow"
                  width="140"
                  height="140"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </Col>

            <Col md={8}>
              <h2 className="fw-bold mb-2">{restaurant.name}</h2>

              <p className="text-muted mb-2">{restaurant.description}</p>

              <Badge
                bg={
                  restaurant.status === "APPROVED"
                    ? "success"
                    : restaurant.status === "PENDING"
                      ? "warning"
                      : "danger"
                }
              >
                {restaurant.status}
              </Badge>
            </Col>

            <Col md={2} className="text-end">
              <Button variant="warning" onClick={() => setShowEditModal(true)}>
                Edit Restaurant
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="fw-bold">Restaurant Images</Card.Header>

        <Card.Body>
          <Row>
            <Col md={6} className="text-center">
              <h6 className="mb-3">Restaurant Logo</h6>

              {restaurant.restaurantPhoto && (
                <img
                  src={`data:image/jpeg;base64,${restaurant.restaurantPhoto}`}
                  alt="Restaurant"
                  className="img-fluid rounded shadow"
                  style={{
                    maxHeight: "220px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Col>

            <Col md={6} className="text-center">
              <h6 className="mb-3">Cover Photo</h6>

              {restaurant.coverPhoto && (
                <img
                  src={`data:image/jpeg;base64,${restaurant.coverPhoto}`}
                  alt="Cover"
                  className="img-fluid rounded shadow"
                  style={{
                    maxHeight: "220px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col lg={6}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="fw-bold">
              Restaurant Information
            </Card.Header>

            <Card.Body>
              <p>
                <strong>Name:</strong> {restaurant.name}
              </p>

              <p>
                <strong>Description:</strong> {restaurant.description}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  bg={
                    restaurant.status === "APPROVED"
                      ? "success"
                      : restaurant.status === "PENDING"
                        ? "warning"
                        : "danger"
                  }
                >
                  {restaurant.status}
                </Badge>
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="fw-bold">Contact Information</Card.Header>

            <Card.Body>
              <p>
                <strong>Email:</strong> {restaurant.email}
              </p>

              <p>
                <strong>Phone:</strong> {restaurant.phoneNumber}
              </p>

              <p>
                <strong>Address:</strong> {restaurant.address}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="fw-bold">Business Hours</Card.Header>

            <Card.Body>
              <p>
                <strong>Open Time:</strong> {restaurant.openTime}
              </p>

              <p>
                <strong>Close Time:</strong> {restaurant.closeTime}
              </p>

              <p>
                <strong>Delivery Start:</strong> {restaurant.startTime}
              </p>

              <p>
                <strong>Delivery End:</strong> {restaurant.endTime}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* LOCATION */}
        <Col lg={6}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="fw-bold">Location Information</Card.Header>

            <Card.Body>
              <p>
                <strong>Latitude:</strong> {restaurant.latitude}
              </p>

              <p>
                <strong>Longitude:</strong> {restaurant.longitude}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <EditRestaurant
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        restaurant={restaurant}
        refreshRestaurant={fetchRestaurant}
      />
    </Container>
  );
};
