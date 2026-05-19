import { useEffect, useState } from "react";

import { Container, Row, Col, Card, Table, Spinner } from "react-bootstrap";

import {
  FaUsers,
  FaStore,
  FaClipboardList,
  FaMoneyBillWave,
  FaUtensils,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import {
  fetchDashboardStats,
  fetchRecentOrders,
} from "../../api/adminDashboardApi";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalMenuItems: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const statsResponse = await fetchDashboardStats();
        setStats(statsResponse.data);

        const ordersResponse = await fetchRecentOrders();
        setRecentOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: <FaUsers size={35} />,
      color: "primary",
    },

    {
      title: "Restaurants",
      value: stats.totalRestaurants,
      icon: <FaStore size={35} />,
      color: "success",
    },

    {
      title: "Orders",
      value: stats.totalOrders,
      icon: <FaClipboardList size={35} />,
      color: "warning",
    },

    {
      title: "Revenue",
      value: `Rs. ${stats.totalRevenue}`,
      icon: <FaMoneyBillWave size={35} />,
      color: "danger",
    },

    {
      title: "Menu Items",
      value: stats.totalMenuItems,
      icon: <FaUtensils size={35} />,
      color: "dark",
    },
  ];

  return (
    <Container fluid className="p-4">
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>

        <p className="text-muted">
          Monitor and manage your food delivery platform
        </p>
      </div>

      {/* Stats Cards */}

      <Row className="g-4 mb-5">
        {cards.map((card, index) => (
          <Col key={index} xl={3} lg={4} md={6}>
            <Card
              className="
                border-0
                shadow-sm
                h-100
                dashboard-card
              "
            >
              <Card.Body
                className="
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <div>
                  <h6 className="text-muted">{card.title}</h6>

                  <h3 className="fw-bold">{card.value}</h3>
                </div>

                <div
                  className={`
                    text-${card.color}
                  `}
                >
                  {card.icon}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Orders Table */}

      <Row className="mb-5">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div
                className="
                  d-flex
                  justify-content-between
                  align-items-center
                  mb-3
                "
              >
                <h5 className="fw-bold">Recent Orders</h5>

                <Link to="/admin/orders" className="btn btn-dark btn-sm">
                  View All
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" />
                </div>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Restaurant</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.orderId}</td>

                        <td>{order.customerName}</td>

                        <td>{order.restaurantName}</td>

                        <td>Rs. {order.totalAmount}</td>

                        <td>
                          <span
                            className={`
                              badge
                              ${
                                order.status === "DELIVERED"
                                  ? "bg-success"
                                  : order.status === "PENDING"
                                    ? "bg-warning"
                                    : "bg-primary"
                              }
                            `}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}

        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-4">Quick Actions</h5>

              <div className="d-grid gap-3">
                <Link
                  to="/admin/restaurants"
                  className="btn btn-outline-success"
                >
                  Manage Restaurants
                </Link>

                <Link
                  to="/admin/view_category"
                  className="btn btn-outline-warning"
                >
                  Manage Categories
                </Link>

                <Link to="/admin/users" className="btn btn-outline-primary">
                  Manage Users
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
