import { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Table,
  Badge,
} from "react-bootstrap";

import {
  FaMoneyBillWave,
  FaClipboardList,
  FaCheckCircle,
  FaUtensils,
} from "react-icons/fa";

import { MdPendingActions } from "react-icons/md";
import { getRestaurantDashboard } from "../../api/restaurantApi";

export const RestaurantDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getRestaurantDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Orders",
      value: dashboard?.totalOrders || 0,
      icon: <FaClipboardList size={28} />,
      bg: "primary",
    },

    {
      title: "Pending Orders",
      value: dashboard?.pendingOrders || 0,
      icon: <MdPendingActions size={28} />,
      bg: "warning",
    },

    {
      title: "Delivered Orders",
      value: dashboard?.deliveredOrders || 0,
      icon: <FaCheckCircle size={28} />,
      bg: "success",
    },

    {
      title: "Menu Items",
      value: dashboard?.totalMenuItems || 0,
      icon: <FaUtensils size={28} />,
      bg: "dark",
    },

    {
      title: "Revenue",
      value: `Rs ${dashboard?.revenue || 0}`,
      icon: <FaMoneyBillWave size={28} />,
      bg: "info",
    },
  ];

  const badgeColor = (status) => {
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

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container fluid>
      <div className="mb-4">
        <h2 className="fw-bold">Restaurant Dashboard</h2>

        <p className="text-muted">Welcome back 👋</p>
      </div>

      <Row className="g-4 mb-4">
        {statCards.map((card, index) => (
          <Col lg={3} md={6} key={index}>
            <Card
              className={`
                shadow-sm
                border-0
                bg-${card.bg}
                text-white
                h-100
              `}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-2">{card.title}</h6>

                    <h3 className="fw-bold mb-0">{card.value}</h3>
                  </div>

                  <div>{card.icon}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white">
          <h5 className="fw-bold mb-0">Recent Orders</h5>
        </Card.Header>

        <Card.Body className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {dashboard?.recentOrders?.length > 0 ? (
                dashboard.recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>#{order.orderId}</td>

                    <td>{order.customerName}</td>

                    <td>Rs {order.totalAmount}</td>

                    <td>
                      <Badge bg={badgeColor(order.orderStatus)}>
                        {order.orderStatus}
                      </Badge>
                    </td>

                    <td>
                      <Badge
                        bg={
                          order.paymentStatus === "PAID" ? "success" : "warning"
                        }
                      >
                        {order.paymentStatus}
                      </Badge>
                    </td>

                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="
                      text-center
                      py-4
                      text-muted
                    "
                  >
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};
