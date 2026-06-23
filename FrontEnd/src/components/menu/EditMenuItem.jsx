import { useState, useEffect } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { getCategoryByRestaurantId } from "../../api/categoryApi";

export const EditMenuItem = ({
  show,
  handleClose,
  menuItem,
  onSave,
  restaurantId,
}) => {
  const [item, setItem] = useState({});
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (menuItem) {
      setItem(menuItem);
      setPreview(
        menuItem.image ? `data:image/jpeg;base64,${menuItem.image}` : null,
      );
    }
  }, [menuItem]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoryByRestaurantId(restaurantId);
        console.log(response);

        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      setItem((prev) => ({
        ...prev,
        image: file,
      }));
    }
    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!item.name?.trim()) {
      newErrors.name = "Item name is required";
    } else if (item.name.trim().length < 3) {
      newErrors.name = "Item name must be at least 3 characters";
    }

    if (!item.price || Number(item.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (item.discountPrice && Number(item.discountPrice) < 0) {
      newErrors.discountPrice = "Discount price cannot be negative";
    }

    if (item.discountPrice && Number(item.discountPrice) > Number(item.price)) {
      newErrors.discountPrice = "Discount price cannot exceed actual price";
    }

    if (!item.categoryId) {
      newErrors.categoryId = "Please select a category";
    }

    if (!item.foodType) {
      newErrors.foodType = "Please select a food type";
    }

    if (!item.description?.trim()) {
      newErrors.description = "Description is required";
    } else if (item.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (item.image instanceof File) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(item.image.type)) {
        newErrors.image = "Only JPG, JPEG, PNG and WEBP images are allowed";
      }

      if (item.image.size > 2 * 1024 * 1024) {
        newErrors.image = "Image size cannot exceed 2MB";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave(item.id, item);
  };

  if (!menuItem) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Menu Item</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={item.name || ""}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={item.price || ""}
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
              value={item.discountPrice || ""}
              onChange={handleChange}
              isInvalid={!!errors.discountPrice}
            />
            <Form.Control.Feedback type="invalid">
              {errors.discountPrice}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              value={item.categoryId || ""}
              onChange={handleChange}
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
              value={item.foodType || ""}
              onChange={handleChange}
              isInvalid={!!errors.foodType}
            >
              <option value="">Select Food Type</option>
              <option value="VEG">VEG</option>
              <option value="NON_VEG">NON_VEG</option>
              <option value="EGG">EGG</option>
              <option value="VEGAN">VEGAN</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.foodType}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              value={item.description || ""}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Item Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>

          {preview && (
            <div className="text-center">
              <Image
                src={preview}
                rounded
                style={{
                  width: "150px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
