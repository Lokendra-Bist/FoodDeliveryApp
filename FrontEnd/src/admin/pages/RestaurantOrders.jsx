import {
  Card,
  Table,
  Badge,
  Form,
  Button,
  Modal,
  Spinner,
  Pagination,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getOrdersByRestaurant, updateOrderStatus } from "../../api/orderApi";

export const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("PENDING");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [page, status]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await getOrdersByRestaurant(page, 10, status);

      setOrders(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      toast.success("Order updated");
      fetchOrders();
    } catch (error) {
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
        <Card.Body className="d-flex justify-content-between align-items-center">
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
        </Card.Body>
      </Card>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td>#{order.orderId}</td>

                      <td>{order.deliveryDetails?.fullName}</td>

                      <td>{order.deliveryDetails?.phoneNumber}</td>

                      <td>Rs. {order.totalAmount}</td>

                      <td>
                        <Badge
                          bg={
                            order.paymentStatus === "PAID"
                              ? "success"
                              : "warning"
                          }
                        >
                          {order.paymentStatus}
                        </Badge>
                      </td>

                      <td>
                        <Badge bg={getBadgeColor(order.orderStatus)}>
                          {order.orderStatus}
                        </Badge>
                      </td>

                      <td>{new Date(order.createdAt).toLocaleString()}</td>

                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowModal(true);
                            }}
                          >
                            View
                          </Button>

                          <Form.Select
                            size="sm"
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <div className="mt-4 d-flex justify-content-center">
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
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details #{selectedOrder?.orderId}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedOrder && (
            <>
              <h6>Customer Information</h6>

              <p>
                <strong>Name:</strong> {selectedOrder.deliveryDetails?.fullName}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedOrder.deliveryDetails?.phoneNumber}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {selectedOrder.deliveryDetails?.location}
              </p>

              <hr />

              <h6>Ordered Items</h6>

              <Table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedOrder.items?.map((item) => (
                    <tr key={item.menuItemId}>
                      <td>{item.menuItemName}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h5 className="text-success">
                Total: Rs. {selectedOrder.totalAmount}
              </h5>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
