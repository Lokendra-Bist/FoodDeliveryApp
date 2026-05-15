import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
  Spinner,
} from "react-bootstrap";

import { useCart } from "../../context/CartContext";
import { initiateEsewaPaymentAPI } from "../../api/paymentApi";

export const Checkout = () => {
  const { cart, totalAmount } = useCart();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    notes: "",
  });

  const deliveryCharge = 50;

  const grandTotal = totalAmount + deliveryCharge;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await initiateEsewaPaymentAPI(formData);

      const paymentData = response.data;

      const form = document.createElement("form");

      form.method = "POST";

      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const fields = {
        amount: paymentData.amount,
        tax_amount: paymentData.taxAmount,
        total_amount: paymentData.totalAmount,
        transaction_uuid: paymentData.transactionUuid,
        product_code: paymentData.productCode,
        product_service_charge: paymentData.productServiceCharge,
        product_delivery_charge: paymentData.productDeliveryCharge,
        success_url: paymentData.successUrl,
        failure_url: paymentData.failureUrl,
        signed_field_names: paymentData.signedFieldNames,
        signature: paymentData.signature,
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");

        input.type = "hidden";

        input.name = key;

        input.value = value;

        form.appendChild(input);
      });

      document.body.appendChild(form);

      form.submit();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm border-0 rounded-4 p-4">
            <h3 className="mb-4">Delivery Details</h3>

            <Form onSubmit={handlePayment}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>

                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>

                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="98XXXXXXXX"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Delivery Address</Form.Label>

                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full delivery address"
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                size="lg"
                className="w-100 rounded-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  "Pay with eSewa"
                )}
              </Button>
            </Form>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body>
              <h4 className="mb-4">Order Summary</h4>

              <ListGroup variant="flush">
                {cart.map((item) => (
                  <ListGroup.Item key={item.menuItemId} className="px-0">
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="fw-semibold">{item.name}</div>

                        <small className="text-muted">
                          Qty: {item.quantity}
                        </small>
                      </div>

                      <div>Rs. {item.price * item.quantity}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>Rs. {totalAmount}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryCharge}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>Rs. {grandTotal}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
