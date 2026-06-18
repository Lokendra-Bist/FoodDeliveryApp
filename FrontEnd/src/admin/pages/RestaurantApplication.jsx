import { useEffect, useState } from "react";
import { Table, Card, Button, Spinner, Badge } from "react-bootstrap";
import Swal from "sweetalert2";

import {
  approveRestaurant,
  getPendingRestaurants,
  rejectRestaurant,
} from "../../api/restaurantApi";
import { RestaurantApplicationViewModal } from "../components/RestaurantApplicationViewModal";

export const RestaurantApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const fetchApplications = async () => {
    try {
      const data = await getPendingRestaurants();
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve Restaurant?",
      text: "This restaurant will become active.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });

    if (!result.isConfirmed) return;

    try {
      await approveRestaurant(id);

      setApplications((prev) => prev.filter((item) => item.id !== id));

      Swal.fire("Approved!", "Restaurant approved successfully.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to approve restaurant.", "error");
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Restaurant?",
      text: "This application will be rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#dc3545",
    });

    if (!result.isConfirmed) return;

    try {
      await rejectRestaurant(id);

      setApplications((prev) => prev.filter((item) => item.id !== id));

      Swal.fire("Rejected!", "Restaurant application rejected.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to reject restaurant.", "error");
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
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-white">
        <h4 className="mb-0 fw-bold">Restaurant Applications</h4>
      </Card.Header>

      <Card.Body className="p-0">
        <Table hover responsive className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Restaurant</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.length > 0 ? (
              applications.map((restaurant, index) => (
                <tr key={restaurant.id}>
                  <td>{index + 1}</td>

                  <td>{restaurant.name}</td>

                  <td>{restaurant.ownerName || restaurant.owner?.fullName}</td>

                  <td>{restaurant.email}</td>

                  <td>{restaurant.phoneNumber}</td>

                  <td>
                    <Badge bg="warning">{restaurant.status}</Badge>
                  </td>

                  <td className="text-center">
                    <Button
                      size="sm"
                      variant="primary"
                      className="me-2"
                      onClick={() => {
                        setSelectedRestaurant(restaurant);
                        setShowViewModal(true);
                      }}
                    >
                      View
                    </Button>

                    <Button
                      size="sm"
                      variant="success"
                      className="me-2"
                      onClick={() => handleApprove(restaurant.id)}
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleReject(restaurant.id)}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  No pending applications found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>

      <RestaurantApplicationViewModal
        show={showViewModal}
        handleClose={() => setShowViewModal(false)}
        restaurant={selectedRestaurant}
      />
    </Card>
  );
};
