import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { getCategoryByRestaurantId } from "../../api/categoryApi";
import { getMenuItemsByRestaurantIdAndCategoryId } from "../../api/menuApi";

export const RestaurantMenu = ({ restaurantId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategoryByRestaurantId(restaurantId);
        setCategories(categoryData);
        if (categoryData.length > 0) {
          setSelectedCategory(categoryData[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) fetchCategories();
  }, [restaurantId]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!selectedCategory) return;
      setItemsLoading(true);
      try {
        const items = await getMenuItemsByRestaurantIdAndCategoryId(
          restaurantId,
          selectedCategory
        );
        setMenuItems(items);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
        setMenuItems([]);
      } finally {
        setItemsLoading(false);
      }
    };

    fetchMenuItems();
  }, [selectedCategory, restaurantId]);

  if (loading) return <p className="text-center mt-5">Loading menu...</p>;
  if (categories.length === 0)
    return <p className="text-center mt-5">No menu available.</p>;

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">Menu</h3>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          paddingBottom: 10,
          gap: "10px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            style={{
              flex: "0 0 auto",
              padding: "8px 16px",
              borderRadius: "20px",
              border:
                selectedCategory === category.id
                  ? "2px solid #0d6efd"
                  : "1px solid #ccc",
              backgroundColor:
                selectedCategory === category.id ? "#0d6efd" : "#fff",
              color: selectedCategory === category.id ? "#fff" : "#000",
              cursor: "pointer",
            }}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {itemsLoading ? (
        <p className="text-center mt-3">Loading items...</p>
      ) : menuItems.length === 0 ? (
        <p className="text-center mt-3">No items in this category.</p>
      ) : (
        <Row className="mt-4 g-4">
          {menuItems.map((item) => {
            const price = Number(item.price);
            const discountPrice = Number(item.discountPrice);

            const discountPercent =
              discountPrice > 0 ? Math.round((discountPrice / price) * 100) : 0;

            return (
              <Col key={item.id} xs={6} sm={4} md={3}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={
                      item.image
                        ? `data:image/jpeg;base64,${item.image}`
                        : "/placeholder-food.png"
                    }
                    style={{ height: 120, objectFit: "cover" }}
                  />
                  <Card.Body className="text-center p-2">
                    <Card.Title className="fs-6">{item.name}</Card.Title>

                    <div className="mb-1">
                      {discountPrice > 0 ? (
                        <>
                          <span className="text-muted text-decoration-line-through">
                            Rs. {price}
                          </span>
                          <span className="fw-bold ms-1">
                            Rs. {price - discountPrice}
                          </span>
                        </>
                      ) : (
                        <span className="fw-bold">Rs. {price}</span>
                      )}
                    </div>

                    {discountPercent > 0 && (
                      <Badge bg="success">{discountPercent}% OFF</Badge>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};
