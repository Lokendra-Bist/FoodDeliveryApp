import { useRef, useState } from "react";
import { Form, Button, Image, Row, Col, Modal } from "react-bootstrap";
import { addRestaurant } from "../../api/restaurantApi";
import toast from "react-hot-toast";

export const AddRestaurant = ({ show, onHide, onRestaurantAdded }) => {
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

    if (!restaurantData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{7,15}$/.test(restaurantData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    const lat = parseFloat(restaurantData.latitude);
    const lng = parseFloat(restaurantData.longitude);

    if (!restaurantData.latitude) {
      newErrors.latitude = "Latitude is required";
    } else if (lat < -90 || lat > 90) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    if (!restaurantData.longitude) {
      newErrors.longitude = "Longitude is required";
    } else if (lng < -180 || lng > 180) {
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

    if (!restaurantData.coverPhoto) {
      newErrors.coverPhoto = "Cover photo is required";
    }

    if (!restaurantData.restaurantPhoto) {
      newErrors.restaurantPhoto = "Restaurant photo is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the highlighted fields");
      return;
    }

    try {
      await addRestaurant(restaurantData);

      toast.success("Restaurant added successfully!");

      resetForm();

      if (onRestaurantAdded) {
        onRestaurantAdded();
      }

      onHide();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add restaurant");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Restaurant</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={restaurantData.name}
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
                  name="description"
                  value={restaurantData.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={restaurantData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={restaurantData.phoneNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  name="latitude"
                  value={restaurantData.latitude}
                  onChange={handleChange}
                  isInvalid={!!errors.latitude}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.latitude}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  name="longitude"
                  value={restaurantData.longitude}
                  onChange={handleChange}
                  isInvalid={!!errors.longitude}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.longitude}
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Open Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="openTime"
                      value={restaurantData.openTime}
                      onChange={handleChange}
                      isInvalid={!!errors.openTime}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.openTime}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Close Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="closeTime"
                      value={restaurantData.closeTime}
                      onChange={handleChange}
                      isInvalid={!!errors.closeTime}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.closeTime}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cover Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="coverPhoto"
                  ref={coverPhotoRef}
                  onChange={handlePhotoChange}
                  isInvalid={!!errors.coverPhoto}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.coverPhoto}
                </Form.Control.Feedback>
              </Form.Group>

              {coverPhotoPreview && <Image src={coverPhotoPreview} thumbnail />}
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Restaurant Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="restaurantPhoto"
                  ref={restaurantPhotoRef}
                  onChange={handlePhotoChange}
                  isInvalid={!!errors.restaurantPhoto}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.restaurantPhoto}
                </Form.Control.Feedback>
              </Form.Group>

              {restaurantPhotoPreview && (
                <Image src={restaurantPhotoPreview} thumbnail />
              )}
            </Col>
          </Row>

          <div className="text-end mt-3">
            <Button variant="secondary" className="me-2" onClick={onHide}>
              Cancel
            </Button>

            <Button type="submit" variant="success">
              Add Restaurant
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
