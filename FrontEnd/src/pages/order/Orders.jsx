import { useEffect, useState } from "react";

import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";

import {
  IoLocationOutline,
  IoCallOutline,
  IoTimeOutline,
} from "react-icons/io5";

import toast from "react-hot-toast";
import { getOrderByUserId } from "../../api/orderApi";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrderByUserId();
      console.log(data);

      setOrders(data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "success";

      case "PENDING":
        return "warning";

      case "CONFIRMED":
        return "primary";

      case "PREPARING":
        return "info";

      case "OUT_FOR_DELIVERY":
        return "dark";

      case "CANCELLED":
        return "danger";

      default:
        return "secondary";
    }
  };

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2 className="fw-bold">My Orders</h2>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : orders.length === 0 ? (
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="text-center py-5">
            <h5>No Orders Found</h5>

            <p className="text-muted mb-0">Your orders will appear here</p>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {orders.map((order) => (
            <Col lg={6} key={order.orderId}>
              <Card className="border-0 shadow-sm rounded-4 h-100 order-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">Order #{order.orderId}</h5>

                      <small className="text-muted">
                        {order.restaurantName}
                      </small>
                    </div>

                    <div className="text-end">
                      <h5 className="fw-bold text-warning">
                        Rs. {order.totalAmount}
                      </h5>
                    </div>
                  </div>

                  <div className="mb-3 d-flex gap-2 flex-wrap">
                    <Badge
                      bg={getStatusColor(order.orderStatus)}
                      className="px-3 py-2"
                    >
                      ORDER: {order.orderStatus}
                    </Badge>

                    <Badge
                      bg={
                        order.paymentStatus === "PAID" ? "success" : "warning"
                      }
                      className="px-3 py-2"
                    >
                      PAYMENT: {order.paymentStatus}
                    </Badge>
                  </div>

                  <div className="mt-3">
                    <small className="text-muted fw-semibold">
                      Ordered Items
                    </small>

                    <div className="d-flex flex-column gap-3 mt-2">
                      {order.items?.map((item) => (
                        <div
                          key={item.menuItemId}
                          className="
                                d-flex
                                align-items-center
                                justify-content-between
                                bg-light
                                rounded-4
                                p-3
                                border
                                "
                        >
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={`http://localhost:2058/FoodDeliveryApp${item.imageUrl}`}
                              alt={item.menuItemName}
                              className="rounded-3"
                              style={{
                                width: "70px",
                                height: "70px",
                                objectFit: "cover",
                              }}
                            />

                            <div>
                              <div className="fw-bold">{item.menuItemName}</div>

                              <small className="text-muted">
                                Quantity: {item.quantity}
                              </small>
                            </div>
                          </div>

                          <div className="text-end">
                            <div className="fw-bold text-success">
                              Rs. {item.price}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-top pt-3">
                    <div className="mb-2 d-flex align-items-center gap-2">
                      <IoTimeOutline />

                      <small>
                        {new Date(order.createdAt).toLocaleString()}
                      </small>
                    </div>

                    <div className="mb-2 d-flex align-items-center gap-2">
                      <IoCallOutline />

                      <small>{order.deliveryDetails.phoneNumber}</small>
                    </div>

                    <div className="d-flex align-items-start gap-2">
                      <IoLocationOutline className="mt-1" />

                      <small>{order.deliveryDetails.location}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <style>
        {`
          .order-card {
            transition: 0.3s ease;
          }

          .order-card:hover {
            transform: translateY(-4px);
          }
        `}
      </style>
    </Container>
  );
};
