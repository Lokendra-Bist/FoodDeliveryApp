import { useEffect, useState } from "react";

import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  Spinner,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

import { FaSearch, FaSyncAlt } from "react-icons/fa";

import toast from "react-hot-toast";

import { getOrdersAPI } from "../../api/orderApi";
import { PaginationControl } from "../../components/common/PaginationControl";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    page: 0,
    size: 8,
    search: "",
    orderStatus: "",
    paymentStatus: "",
    sortBy: "createdAt",
    sortDir: "desc",
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrdersAPI(
        filters.page,
        filters.size,
        filters.search,
        filters.orderStatus,
        filters.paymentStatus,
        filters.sortBy,
        filters.sortDir,
      );

      setOrders(data.content);

      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getBadgeColor = (status) => {
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
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Orders Management</h2>

          <p className="text-muted mb-0">Track and manage customer orders</p>
        </div>

        <Button variant="dark" onClick={fetchOrders}>
          <FaSyncAlt className="me-2" />
          Refresh
        </Button>
      </div>

      {/* FILTERS */}

      <Card className="border-0 shadow-sm mb-4 rounded-4">
        <Card.Body>
          <Row className="g-3">
            <Col lg={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>

                <Form.Control
                  placeholder="Search customer..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      search: e.target.value,
                      page: 0,
                    }))
                  }
                />
              </InputGroup>
            </Col>

            <Col lg={3}>
              <Form.Select
                value={filters.orderStatus}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    orderStatus: e.target.value,
                    page: 0,
                  }))
                }
              >
                <option value="">All Order Status</option>

                <option value="PENDING">Pending</option>

                <option value="CONFIRMED">Confirmed</option>

                <option value="PREPARING">Preparing</option>

                <option value="OUT_FOR_DELIVERY">Out For Delivery</option>

                <option value="DELIVERED">Delivered</option>

                <option value="CANCELLED">Cancelled</option>
              </Form.Select>
            </Col>

            <Col lg={3}>
              <Form.Select
                value={filters.paymentStatus}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    paymentStatus: e.target.value,
                    page: 0,
                  }))
                }
              >
                <option value="">All Payment Status</option>

                <option value="PAID">Paid</option>

                <option value="PENDING">Pending</option>

                <option value="FAILED">Failed</option>
              </Form.Select>
            </Col>

            <Col lg={2}>
              <Button
                variant="outline-dark"
                className="w-100"
                onClick={() =>
                  updateFilter(
                    "sortDir",
                    filters.sortDir === "asc" ? "desc" : "asc",
                  )
                }
              >
                {filters.sortDir === "asc" ? "Oldest" : "Newest"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* ORDERS */}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4">
          {orders.map((order) => (
            <Col lg={6} key={order.orderId}>
              <Card className="border-0 shadow-sm rounded-4 h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <h5 className="fw-bold">Order #{order.orderId}</h5>

                      <div>{order.customerName}</div>

                      <small className="text-muted">
                        {order.restaurantName}
                      </small>
                    </div>

                    <div className="text-end">
                      <h5 className="fw-bold">Rs. {order.totalAmount}</h5>

                      <small className="text-muted">
                        {order.quantity} items
                      </small>

                      <div className="mt-2">
                        <small className="text-muted">Ordered Items</small>

                        <div className="d-flex flex-wrap gap-2 mt-1">
                          {order.items?.map((item, index) => (
                            <Badge bg="light" text="dark" key={index}>
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <Badge
                      bg={getBadgeColor(order.orderStatus)}
                      className="me-2"
                    >
                      {order.orderStatus}
                    </Badge>

                    <Badge
                      bg={
                        order.paymentStatus === "PAID" ? "success" : "warning"
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">Ordered At</small>

                    <div>{new Date(order.createdAt).toLocaleString()}</div>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">Phone Number</small>

                    <div>{order.phoneNumber}</div>
                  </div>

                  <div>
                    <small className="text-muted">Delivery Address</small>

                    <div>{order.location}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <PaginationControl
        page={filters.page}
        totalPages={totalPages}
        onPageChange={(newPage) => updateFilter("page", newPage)}
      />
    </Container>
  );
};
