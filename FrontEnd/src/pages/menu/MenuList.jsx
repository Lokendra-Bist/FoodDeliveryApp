import { useEffect, useState } from "react";
import { MenuCard } from "../../components/menu/MenuCard";
import { getAllMenuItems } from "../../api/menuApi";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Form,
} from "react-bootstrap";

export const MenuList = () => {
  const [menuData, setMenuData] = useState([]);
  const [foodType, setFoodType] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFoodType, setSelectedFoodType] = useState("ALL");
  const [restaurantSearch, setRestaurantSearch] = useState("");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await getAllMenuItems();
        setMenuData(response);
        setFilteredData(response);

        setFoodType(["ALL", ...new Set(response.map((item) => item.foodType))]);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  const applyFilters = (foodTypeFilter, restaurantQuery) => {
    let data = [...menuData];

    if (foodTypeFilter !== "ALL") {
      data = data.filter((item) => item.foodType === foodTypeFilter);
    }

    if (restaurantQuery.trim() !== "") {
      const query = restaurantQuery.toLowerCase();
      data = data.filter((item) =>
        item.restaurantName.toLowerCase().includes(query)
      );
    }

    setFilteredData(data);
  };

  const handleFoodTypeFilter = (type) => {
    setSelectedFoodType(type);
    applyFilters(type, restaurantSearch);
  };

  const handleRestaurantSearch = (e) => {
    const query = e.target.value;
    setRestaurantSearch(query);
    applyFilters(selectedFoodType, query);
  };

  return (
    <Container className="mt-4">
      <ButtonGroup className="mb-3 me-3">
        {foodType.map((type) => (
          <Button
            key={type}
            variant={selectedFoodType === type ? "primary" : "outline-primary"}
            onClick={() => handleFoodTypeFilter(type)}
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>

      <Form.Control
        type="text"
        placeholder="Search by restaurant..."
        value={restaurantSearch}
        onChange={handleRestaurantSearch}
        className="mb-3"
      />

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredData.map((menuItem) => (
          <Col key={menuItem.id}>
            <MenuCard menuItem={menuItem} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
