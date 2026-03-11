import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";

import { getRestaurantById, updateRestaurant } from "../../api/restaurantApi";
import { getMenuItemByRestaurant } from "../../api/menuApi";
import { EditRestaurant } from "../../components/restaurant/EditRestaurant";
import MenuItemTable from "../../components/menu/MenuItemTable";
import toast from "react-hot-toast";

export const ViewRestaurant = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await getRestaurantById(id);
        setRestaurant(resData);

        const menuData = await getMenuItemByRestaurant(id);
        setMenuItems(menuData);
      } catch (err) {
        console.error("Failed to load restaurant", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRestaurantChange = (field, value) => {
    setRestaurant({ ...restaurant, [field]: value });
  };

  const handleSaveRestaurant = async () => {
    try {
      await updateRestaurant(id, restaurant);
      toast.success("Restaurant updated successfully");
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update restaurant");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!restaurant) {
    return <p className="text-center mt-5">Restaurant not found</p>;
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="fw-semibold d-flex justify-content-between align-items-center">
              Restaurant Information
              <Button
                size="sm"
                variant="primary"
                onClick={() => setShowEditModal(true)}
              >
                Edit Restaurant
              </Button>
            </Card.Header>

            <Card.Body>
              <p>
                <strong>Name:</strong> {restaurant.name}
              </p>
              <p>
                <strong>Description:</strong> {restaurant.description}
              </p>
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

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="fw-semibold">Images</Card.Header>

            <Card.Body className="text-center">
              {restaurant.restaurantPhoto && (
                <img
                  src={`data:image/jpeg;base64,${restaurant.restaurantPhoto}`}
                  alt="Restaurant"
                  style={{
                    width: "200px",
                    height: "150px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
              )}

              {restaurant.coverPhoto && (
                <img
                  src={`data:image/jpeg;base64,${restaurant.coverPhoto}`}
                  alt="Cover"
                  style={{
                    width: "200px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <MenuItemTable
        restaurant={restaurant}
        setRestaurant={setRestaurant}
        menuItems={menuItems}
        setMenuItems={setMenuItems}
      />

      <EditRestaurant
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        restaurant={restaurant}
        handleRestaurantChange={handleRestaurantChange}
        handleSaveRestaurant={handleSaveRestaurant}
      />
    </Container>
  );
};
