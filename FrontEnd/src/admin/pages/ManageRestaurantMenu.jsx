import { useEffect, useState } from "react";
import { Spinner, Container } from "react-bootstrap";

import MenuItemTable from "../../components/menu/MenuItemTable";
import { getMenuItemByRestaurant } from "../../api/menuApi";
import { getRestaurantByOwner } from "../../api/restaurantApi";

export const ManageRestaurantMenu = () => {
  const [restaurant, setRestaurant] = useState(null);

  const [menuItems, setMenuItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchRestaurantData = async () => {
    try {
      const restaurantData = await getRestaurantByOwner();

      setRestaurant(restaurantData);

      const menuData = await getMenuItemByRestaurant(restaurantData.id);

      setMenuItems(menuData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <Container className="mt-5">
        <h5>No restaurant found</h5>
      </Container>
    );
  }

  return (
    <Container fluid>
      <MenuItemTable
        restaurant={restaurant}
        menuItems={menuItems}
        setMenuItems={setMenuItems}
        refreshMenuItems={fetchRestaurantData}
      />
    </Container>
  );
};
