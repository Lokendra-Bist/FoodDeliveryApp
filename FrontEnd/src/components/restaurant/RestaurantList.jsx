import { RestaurantCard } from "./RestaurantCard";
import { Container } from "react-bootstrap";

export const RestaurantList = ({ restaurants }) => {
  return (
    <Container className="my-4">
      <h2 className="mb-3">Restaurants</h2>

      <div className="restaurant-scroll d-flex gap-3 overflow-auto pb-2">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card-wrapper">
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </Container>
  );
};
