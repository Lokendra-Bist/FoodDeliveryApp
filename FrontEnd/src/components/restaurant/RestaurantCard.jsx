import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import open from "../../assets/open.png";
import delivery from "../../assets/fast-delivery.png";

export const RestaurantCard = ({ restaurant }) => {
  const formatTo12Hour = (time24) => {
    if (!time24) return "";
    const [hour, minute] = time24.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <Link
      to={`/restaurant-detail/${restaurant.id}`}
      className="text-decoration-none"
    >
      <Card className="mb-3 shadow-sm">
        <Row className="g-0 flex-column flex-md-row">
          <Col md={4}>
            <Card.Img
              src={`data:image/jpeg;base64,${restaurant.restaurantPhoto}`}
              alt={restaurant.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Col>

          <Col md={8}>
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text className="mb-2">{restaurant.address}</Card.Text>

              <small className="text-muted d-block mb-1">
                <img
                  src={open}
                  alt="open"
                  height={20}
                  width={20}
                  className="me-1"
                />
                {formatTo12Hour(restaurant.openTime)} -{" "}
                {formatTo12Hour(restaurant.closeTime)}
              </small>

              <small className="text-muted d-block">
                <img
                  src={delivery}
                  alt="delivery"
                  height={20}
                  width={20}
                  className="me-1"
                />
                {formatTo12Hour(restaurant.startTime)} -{" "}
                {formatTo12Hour(restaurant.endTime)}
              </small>

              {restaurant.description && (
                <Card.Text className="mt-2">{restaurant.description}</Card.Text>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};
