import { useEffect, useState } from "react";
import { RestaurantCard } from "../../components/restaurant/RestaurantCard";
import { getAllRestaurants } from "../../api/restaurantApi";
import { Container, Row, Col } from "react-bootstrap";

export const Restaurant = () => {
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await getAllRestaurants();
        setRestaurantData(response);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurant();
  }, []);

  return (
    <Container className="my-5">
      <h3 className="mb-4 fw-semibold">Featured Restaurants</h3>

      <Row>
        {restaurantData.map((restaurant) => (
          <Col key={restaurant.id} xs={12} sm={6} lg={4} className="mb-4">
            <RestaurantCard restaurant={restaurant} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
