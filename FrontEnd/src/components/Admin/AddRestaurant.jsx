import { useRef, useState } from "react";
import {
  Form,
  Button,
  Image,
  Container,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { addRestaurant } from "../Api/Restaurant";
import toast from "react-hot-toast";

export const AddRestaurant = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    location: "",
    openTime: "",
    closeTime: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData({ ...restaurantData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRestaurantData({ ...restaurantData, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addRestaurant(restaurantData);
      console.log("Restaurant added successfully:", response);
      if (response.status === 200) {
        toast.success("Restaurant Added Successfully!");

        setRestaurantData({
          name: "",
          location: "",
          openTime: "",
          closeTime: "",
          photo: null,
        });
        setPhotoPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error("Error adding restaurant:", error);
      toast.error("Failed To Add Restaurant.");
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-sm p-4">
        <Card.Body>
          <h2 className="mb-4 text-center text-success">Add New Restaurant</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Restaurant Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={restaurantData.name}
                    onChange={handleChange}
                    placeholder="Enter restaurant name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={restaurantData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Open Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="openTime"
                    value={restaurantData.openTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Close Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="closeTime"
                    value={restaurantData.closeTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Photo</Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    required
                  />
                </Form.Group>

                {photoPreview && (
                  <div className="mb-3 text-center">
                    <p className="fw-bold">Photo Preview</p>
                    <Image
                      src={photoPreview}
                      alt="Preview"
                      thumbnail
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </Col>
            </Row>

            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" variant="success" size="lg">
                Add Restaurant
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
