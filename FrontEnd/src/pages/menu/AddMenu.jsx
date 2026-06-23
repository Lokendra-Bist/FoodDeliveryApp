import { useEffect, useRef, useState } from "react";
import { Col, Row, Image, Button, Form, Modal } from "react-bootstrap";
import { getAllRestaurants } from "../../api/restaurantApi";
import { getAllCategories } from "../../api/categoryApi";
import { addMenuItem } from "../../api/menuApi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export const AddMenu = ({ show, handleClose, onSuccess, restaurantId }) => {
  const { roles } = useAuth();

  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    image: null,
    categoryId: "",
    restaurantId: restaurantId || "",
    foodType: "",
  });
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!menuItem.name.trim()) {
      newErrors.name = "Item name is required";
    } else if (menuItem.name.trim().length < 3) {
      newErrors.name = "Item name must be at least 3 characters";
    }

    if (!menuItem.description.trim()) {
      newErrors.description = "Description is required";
    } else if (menuItem.description.trim().length < 10) {
      newErrors.description = "Description must contain at least 10 characters";
    }

    if (!menuItem.price) {
      newErrors.price = "Price is required";
    } else if (Number(menuItem.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (
      menuItem.discountPrice &&
      Number(menuItem.discountPrice) >= Number(menuItem.price)
    ) {
      newErrors.discountPrice =
        "Discount price must be less than original price";
    }

    if (roles.includes("ADMIN") && !menuItem.restaurantId) {
      newErrors.restaurantId = "Please select a restaurant";
    }

    if (!menuItem.categoryId) {
      newErrors.categoryId = "Please select a category";
    }

    if (!menuItem.foodType) {
      newErrors.foodType = "Please select food type";
    }

    if (!menuItem.image) {
      newErrors.image = "Please upload an image";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const response = await addMenuItem(menuItem);
    if (response) {
      toast.success("Menu item added successfully");
      onSuccess();
      handleClose();
      setMenuItem({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        image: null,
        categoryId: "",
        restaurantId: restaurantId || "",
        foodType: "",
      });

      setErrors({});
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
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Menu Item</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  name="name"
                  value={menuItem.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Discount Price</Form.Label>
                <Form.Control
                  type="number"
                  name="discountPrice"
                  value={menuItem.discountPrice}
                  onChange={handleChange}
                  isInvalid={!!errors.discountPrice}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discountPrice}
                </Form.Control.Feedback>
              </Form.Group>

              {roles.includes("ADMIN") && (
                <Form.Group className="mb-3">
                  <Form.Label>Restaurant</Form.Label>

                  <Form.Select
                    name="restaurantId"
                    value={menuItem.restaurantId}
                    onChange={handleChange}
                    isInvalid={!!errors.restaurantId}
                  >
                    <option value="">Select Restaurant</option>

                    {restaurants.map((restaurant) => (
                      <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.restaurantId}
                  </Form.Control.Feedback>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="categoryId"
                  value={menuItem.categoryId}
                  onChange={handleChange}
                  required
                  disabled={!menuItem.restaurantId}
                  isInvalid={!!errors.categoryId}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.categoryId}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Food Type</Form.Label>
                <Form.Select
                  name="foodType"
                  value={menuItem.foodType}
                  onChange={handleChange}
                  isInvalid={!!errors.foodType}
                >
                  <option value="">Select Food Type</option>
                  <option value="VEG">Veg</option>
                  <option value="NON_VEG">Non-Veg</option>
                  <option value="EGG">Egg</option>
                  <option value="VEGAN">Vegan</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.foodType}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  isInvalid={!!errors.image}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image}
                </Form.Control.Feedback>
              </Form.Group>

              {preview && (
                <Image src={preview} thumbnail style={{ maxHeight: 200 }} />
              )}
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button
              variant="secondary"
              onClick={handleClose}
              size="lg"
              className="me-2"
            >
              Cancel
            </Button>

            <Button type="submit" variant="success" size="lg">
              Add Menu Item
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
