import { Card, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MenuCard = ({ menuItem }) => {
  const price = Number(menuItem.price);
  const discountPrice = Number(menuItem.discountPrice);

  const discountPercent =
    discountPrice > 0 ? Math.round((discountPrice / price) * 100) : 0;

  const foodTypeColors = {
    VEG: "success",
    NON_VEG: "danger",
    EGG: "warning",
    VEGAR: "info",
  };
  const badgeColor = foodTypeColors[menuItem.foodType] || "secondary";

  return (
    <Link
      to={`/menu-detail/${menuItem.id}`}
      className="text-decoration-none text-dark menu-card-link"
    >
      <Card className="mb-4 shadow-sm">
        <Row className="g-0 flex-column flex-md-row">
          <Col md={4} className="position-relative">
            <Card.Img
              src={`http://localhost:2058/FoodDeliveryApp/api/menuItem/${menuItem.id}/image`}
              alt={menuItem.name}
              style={{ height: "200px", objectFit: "cover", width: "100%" }}
            />

            <Badge
              bg={badgeColor}
              className="position-absolute top-0 start-0 m-2"
              style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
            >
              {menuItem.foodType}
            </Badge>
          </Col>

          <Col md={8}>
            <Card.Body>
              <Card.Title>{menuItem.name}</Card.Title>
              <Card.Text>{menuItem.restaurantName}</Card.Text>
              <Card.Text>{menuItem.location}</Card.Text>

              <div className="mb-2">
                {discountPrice > 0 ? (
                  <>
                    <span className="text-muted text-decoration-line-through">
                      Rs. {price}
                    </span>
                    <span className="fw-bold ms-2">
                      Rs. {price - discountPrice}
                    </span>
                  </>
                ) : (
                  <span className="fw-bold">Rs. {price}</span>
                )}
              </div>

              {discountPercent > 0 && (
                <Badge
                  bg="success"
                  style={{ fontSize: "0.75rem", fontWeight: 600 }}
                >
                  {discountPercent}% OFF
                </Badge>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};
