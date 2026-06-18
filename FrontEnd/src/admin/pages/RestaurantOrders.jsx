import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Badge,
  Form,
  Spinner,
  Pagination,
} from "react-bootstrap";

import toast from "react-hot-toast";

import { getOrdersByRestaurant, updateOrderStatus } from "../../api/orderApi";

export const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("PENDING");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await getOrdersByRestaurant(page, 10, status);

      setOrders(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, status]);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);

      toast.success("Order updated");

      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order");
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";

      case "CONFIRMED":
        return "primary";

      case "PREPARING":
        return "info";

      case "OUT_FOR_DELIVERY":
        return "secondary";

      case "DELIVERED":
        return "success";

      case "CANCELLED":
        return "danger";

      default:
        return "dark";
    }
  };

  return (
    <>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="fw-bold mb-1">Restaurant Orders</h3>

              <small className="text-muted">Manage customer orders</small>
            </div>

            <Form.Select
              style={{ width: "220px" }}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(0);
              }}
            >
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PREPARING">Preparing</option>
              <option value="OUT_FOR_DELIVERY">Out For Delivery</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </Form.Select>
          </div>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row>
            {orders.length > 0 ? (
              orders.map((order) => (
                <Col lg={6} key={order.orderId}>
                  <Card className="shadow-sm border-0 mb-4">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5 className="fw-bold">Order #{order.orderId}</h5>

                          <small className="text-muted">
                            {new Date(order.createdAt).toLocaleString()}
                          </small>
                        </div>

                        <Badge bg={getBadgeColor(order.orderStatus)}>
                          {order.orderStatus}
                        </Badge>
                      </div>

                      <hr />

                      <h6 className="fw-semibold">Customer Details</h6>

                      <p className="mb-1">
                        <strong>Name:</strong> {order.deliveryDetails?.fullName}
                      </p>

                      <p className="mb-1">
                        <strong>Phone:</strong>{" "}
                        {order.deliveryDetails?.phoneNumber}
                      </p>

                      <p className="mb-3">
                        <strong>Address:</strong>{" "}
                        {order.deliveryDetails?.location}
                      </p>

                      <h6 className="fw-semibold">Payment</h6>

                      <Badge
                        bg={
                          order.paymentStatus === "PAID" ? "success" : "warning"
                        }
                      >
                        {order.paymentStatus}
                      </Badge>

                      <p className="mt-3 mb-1">
                        <strong>Total:</strong>
                        <span className="text-success fw-bold ms-2">
                          Rs. {order.totalAmount}
                        </span>
                      </p>

                      <hr />

                      <h6 className="fw-semibold">Order Items</h6>

                      {order.items?.map((item) => (
                        <div
                          key={item.id}
                          className="d-flex justify-content-between border-bottom py-2"
                        >
                          <div>{item.menuItemName}</div>

                          <div>x {item.quantity}</div>
                        </div>
                      ))}

                      <div className="mt-4">
                        <Form.Select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusUpdate(order.orderId, e.target.value)
                          }
                        >
                          <option value="PENDING">Pending</option>

                          <option value="CONFIRMED">Confirmed</option>

                          <option value="PREPARING">Preparing</option>

                          <option value="OUT_FOR_DELIVERY">
                            Out For Delivery
                          </option>

                          <option value="DELIVERED">Delivered</option>

                          <option value="CANCELLED">Cancelled</option>
                        </Form.Select>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="text-center py-5">
                    <h5>No Orders Found</h5>

                    <p className="text-muted mb-0">
                      No orders available for this status.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                />

                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={page === index}
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  disabled={page === totalPages - 1}
                  onClick={() => setPage(page + 1)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </>
  );
};
