import { useEffect, useRef, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { getAllRestaurants } from "../../api/restaurantApi";
import { getAllCategories } from "../../api/categoryApi";
import { addMenuItem } from "../../api/menuApi";
import Swal from "sweetalert2";

export const AddMenu = () => {
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    image: null,
    categoryId: "",
    restaurantId: "",
    foodType: "",
  });
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMenuItem((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!menuItem.name.trim()) {
      alert("Item name is required");
      return;
    }

    const price = Number(menuItem.price);
    const discountPrice = Number(menuItem.discountPrice);

    if (price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (menuItem.discountPrice && discountPrice >= price) {
      alert("Discount price must be less than price");
      return;
    }

    if (!menuItem.image) {
      alert("Image is required");
      return;
    }

    const response = await addMenuItem(menuItem);
    if (response) {
      Swal.fire("Success", "Menu item added successfully", "success");
      setMenuItem({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        image: null,
        categoryId: "",
        restaurantId: "",
        foodType: "",
      });
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } else {
      Swal.fire("Error", "Failed to add menu item", "error");
    }
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getAllRestaurants();
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <Container className="my-5">
      <Card className="shadow-sm p-4">
        <Card.Body>
          <h2 className="mb-4 text-center text-success">Add Menu Item</h2>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={menuItem.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    maxLength={200}
                    name="description"
                    value={menuItem.description}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text muted>
                    {menuItem.description.length}/200 characters
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={menuItem.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Discount Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="discountPrice"
                    value={menuItem.discountPrice}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Restaurant</Form.Label>
                  <Form.Select
                    name="restaurantId"
                    value={menuItem.restaurantId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Restaurant</option>
                    {restaurants.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="categoryId"
                    value={menuItem.categoryId}
                    onChange={handleChange}
                    required
                    disabled={!menuItem.restaurantId}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Food Type</Form.Label>
                  <Form.Select
                    name="foodType"
                    value={menuItem.foodType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Food Type</option>
                    <option value="VEG">Veg</option>
                    <option value="NON_VEG">Non-Veg</option>
                    <option value="EGG">Egg</option>
                    <option value="VEGAN">Vegan</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    required
                  />
                </Form.Group>

                {preview && (
                  <Image src={preview} thumbnail style={{ maxHeight: 200 }} />
                )}
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button type="submit" variant="success" size="lg">
                Add Menu Item
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
