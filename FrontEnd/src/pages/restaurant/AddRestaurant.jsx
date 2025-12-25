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
import { addRestaurant } from "../../api/restaurantApi";
import toast from "react-hot-toast";

export const AddRestaurant = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    address: "",
    phoneNumber: "",
    latitude: "",
    longitude: "",
    openTime: "",
    closeTime: "",
    startTime: "",
    endTime: "",
    coverPhoto: null,
    restaurantPhoto: null,
  });
  const [errors, setErrors] = useState({});
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  const [restaurantPhotoPreview, setRestaurantPhotoPreview] = useState(null);

  const coverPhotoRef = useRef();
  const restaurantPhotoRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    setRestaurantData((prev) => ({
      ...prev,
      [name]: file,
    }));

    if (name === "coverPhoto") {
      setCoverPhotoPreview(URL.createObjectURL(file));
    } else {
      setRestaurantPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!restaurantData.name.trim()) {
      newErrors.name = "Restaurant name is required";
    } else if (restaurantData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!restaurantData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (restaurantData.description.length > 200) {
      newErrors.description = "Description cannot exceed 200 characters";
    }

    if (!restaurantData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (restaurantData.address.length < 5) {
      newErrors.address = "Address is too short";
    }

    if (!restaurantData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{7,15}$/.test(restaurantData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (
      restaurantData.latitude === "" ||
      restaurantData.latitude < -90 ||
      restaurantData.latitude > 90
    ) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    if (
      restaurantData.longitude === "" ||
      restaurantData.longitude < -180 ||
      restaurantData.longitude > 180
    ) {
      newErrors.longitude = "Longitude must be between -180 and 180";
    }

    if (!restaurantData.openTime) {
      newErrors.openTime = "Open time is required";
    }

    if (!restaurantData.closeTime) {
      newErrors.closeTime = "Close time is required";
    } else if (
      restaurantData.openTime &&
      restaurantData.closeTime <= restaurantData.openTime
    ) {
      newErrors.closeTime = "Close time must be after open time";
    }

    if (!restaurantData.startTime) {
      newErrors.startTime = "Delivery start time is required";
    }

    if (!restaurantData.endTime) {
      newErrors.endTime = "Delivery end time is required";
    } else if (
      restaurantData.startTime &&
      restaurantData.endTime <= restaurantData.startTime
    ) {
      newErrors.endTime = "Delivery end time must be after start time";
    }

    if (!restaurantData.coverPhoto) {
      newErrors.coverPhoto = "Cover photo is required";
    }

    if (!restaurantData.restaurantPhoto) {
      newErrors.restaurantPhoto = "Restaurant photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      await addRestaurant(restaurantData);
      toast.success("Restaurant added successfully!");

      setRestaurantData({
        name: "",
        description: "",
        address: "",
        phoneNumber: "",
        latitude: "",
        longitude: "",
        openTime: "",
        closeTime: "",
        startTime: "",
        endTime: "",
        coverPhoto: null,
        restaurantPhoto: null,
      });
      setErrors({});
      setCoverPhotoPreview(null);
      setRestaurantPhotoPreview(null);
      if (coverPhotoRef.current) coverPhotoRef.current.value = null;
      if (restaurantPhotoRef.current) restaurantPhotoRef.current.value = null;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add restaurant");
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
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    maxLength={200}
                    value={restaurantData.description}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text muted>
                    {restaurantData.description.length}/200 characters
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={restaurantData.address}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phoneNumber"
                    value={restaurantData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Latitude</Form.Label>
                      <Form.Control
                        type="number"
                        step="any"
                        min="-90"
                        max="90"
                        name="latitude"
                        value={restaurantData.latitude}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.latitude}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Longitude</Form.Label>
                      <Form.Control
                        type="number"
                        step="any"
                        min="-180"
                        max="180"
                        name="longitude"
                        value={restaurantData.longitude}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.longitude}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Open Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="openTime"
                    value={restaurantData.openTime}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.openTime}
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    {errors.closeTime}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Delivery Time From
                  </Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={restaurantData.startTime}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.startTime}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Delivery Time To</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={restaurantData.endTime}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.endTime}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Cover Photo</Form.Label>
                  <Form.Control
                    type="file"
                    name="coverPhoto"
                    ref={coverPhotoRef}
                    onChange={handlePhotoChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.coverPhoto}
                  </Form.Control.Feedback>
                </Form.Group>

                {coverPhotoPreview && (
                  <Image
                    src={coverPhotoPreview}
                    thumbnail
                    className="mb-3"
                    style={{ maxHeight: 200 }}
                  />
                )}

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Restaurant Photo</Form.Label>
                  <Form.Control
                    type="file"
                    name="restaurantPhoto"
                    ref={restaurantPhotoRef}
                    onChange={handlePhotoChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.restaurantPhoto}
                  </Form.Control.Feedback>
                </Form.Group>

                {restaurantPhotoPreview && (
                  <Image
                    src={restaurantPhotoPreview}
                    thumbnail
                    className="mb-3"
                    style={{ maxHeight: 200 }}
                  />
                )}
              </Col>
            </Row>

            <div className="text-center mt-4">
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
