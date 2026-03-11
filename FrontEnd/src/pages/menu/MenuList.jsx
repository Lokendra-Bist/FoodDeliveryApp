import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAllMenuItems } from "../../api/menuApi";
import { MenuCard } from "../../components/menu/MenuCard";
import { MenuFilters } from "../../components/menu/MenuFilter";

export const MenuList = () => {
  const [menuData, setMenuData] = useState([]);
  const [foodTypes, setFoodTypes] = useState([]);
  const [selectedFoodType, setSelectedFoodType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemSearch, setItemSearch] = useState("");

  useEffect(() => {
    const fetchMenuData = async () => {
      const response = await getAllMenuItems();
      setMenuData(response);
      setFoodTypes(["ALL", ...new Set(response.map((i) => i.foodType))]);
    };
    fetchMenuData();
  }, []);

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const itemQuery = itemSearch.toLowerCase().trim();

    return menuData.filter((item) => {
      const foodType = item.foodType?.toLowerCase() || "";
      const restaurant = item.restaurantName?.toLowerCase() || "";
      const itemName = item.name?.toLowerCase() || "";

      const matchesFoodType =
        selectedFoodType === "ALL" ||
        foodType === selectedFoodType.toLowerCase();

      const matchesGeneralSearch =
        !query || restaurant.includes(query) || foodType.includes(query);

      const matchesItemSearch = !itemQuery || itemName.includes(itemQuery);

      return matchesFoodType && matchesGeneralSearch && matchesItemSearch;
    });
  }, [menuData, selectedFoodType, searchQuery, itemSearch]);

  return (
    <Container fluid className="mt-4">
      <Row className="gx-4">
        <Col xs={12} md={3} lg={2} className="mb-3">
          <MenuFilters
            foodTypes={foodTypes}
            selectedFoodType={selectedFoodType}
            onFoodTypeChange={setSelectedFoodType}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            itemSearch={itemSearch}
            onItemSearchChange={setItemSearch}
          />
        </Col>

        <Col xs={12} md={9} lg={10}>
          <Row xs={1} sm={2} lg={3} className="g-4">
            {filteredData.length > 0 ? (
              filteredData.map((menuItem) => (
                <Col key={menuItem.id}>
                  <MenuCard menuItem={menuItem} />
                </Col>
              ))
            ) : (
              <div className="text-center text-muted mt-5">
                <h6>No matching food found..!!</h6>
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
