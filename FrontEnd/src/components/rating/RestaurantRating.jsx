import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export const RestaurantRating = ({ show, handleClose, order, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit({
      orderId: order.orderId,
      rating,
      comment,
    });

    setRating(5);
    setComment("");
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rate Restaurant</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5>{order.restaurantName}</h5>

        <div className="text-center my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={35}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#ffc107" : "#dee2e6",
                marginRight: "8px",
              }}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <Form.Group>
          <Form.Label>Comment</Form.Label>

          <Form.Control
            as="textarea"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="warning" onClick={handleSubmit}>
          Submit Rating
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
