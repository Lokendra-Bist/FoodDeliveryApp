import { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTopRatedRestaurants } from "../../api/restaurantApi";

export const TopRatedRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopRestaurants();
  }, []);

  const fetchTopRestaurants = async () => {
    try {
      const data = await getTopRatedRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Top Rated Restaurants</h2>

        <p className="text-muted">
          Discover the most loved restaurants on FoodFusion
        </p>
      </div>

      <Row className="justify-content-center g-4">
        {restaurants.map((restaurant, index) => (
          <Col
            key={restaurant.restaurantId}
            xs={12}
            sm={6}
            lg={3}
            className="d-flex"
          >
            <Link
              to={`/restaurant-detail/${restaurant.restaurantId}`}
              className="text-decoration-none w-100"
            >
              <Card className="restaurant-card border-0 shadow-sm h-100 overflow-hidden">
                <div className="position-relative">
                  <Card.Img
                    src={`data:image/jpeg;base64,${restaurant.image}`}
                    alt={restaurant.restaurantName}
                    className="restaurant-image"
                  />

                  <Badge
                    bg="warning"
                    text="dark"
                    className="position-absolute top-0 end-0 m-2 px-3 py-2"
                  >
                    #{index + 1}
                  </Badge>
                </div>

                <Card.Body className="text-center">
                  <Card.Title className="fw-bold mb-3">
                    {restaurant.restaurantName}
                  </Card.Title>

                  <div className="mb-2">
                    <span className="fs-5 text-warning fw-bold">
                      ⭐ {restaurant.averageRating}
                    </span>
                  </div>

                  <small className="text-muted">
                    {restaurant.totalRatings} Reviews
                  </small>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <style>
        {`
          .restaurant-card {
            border-radius: 20px;
            transition: all 0.3s ease;
          }

          .restaurant-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important;
          }

          .restaurant-image {
            height: 220px;
            object-fit: cover;
            transition: transform 0.4s ease;
          }

          .restaurant-card:hover .restaurant-image {
            transform: scale(1.05);
          }

          @media (max-width: 768px) {
            .restaurant-image {
              height: 200px;
            }
          }
        `}
      </style>
    </Container>
  );
};
