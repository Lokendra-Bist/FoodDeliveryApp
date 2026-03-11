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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={item.price || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Discount Price</Form.Label>
            <Form.Control
              type="number"
              name="discountPrice"
              value={item.discountPrice || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              value={item.categoryId || ""}
              onChange={handleChange}
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
              value={item.foodType || ""}
              onChange={handleChange}
            >
              <option value="">Select Food Type</option>
              <option value="VEG">VEG</option>
              <option value="NON_VEG">NON_VEG</option>
              <option value="EGG">EGG</option>
              <option value="VEGAN">VEGAN</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              value={item.description || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Item Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
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
