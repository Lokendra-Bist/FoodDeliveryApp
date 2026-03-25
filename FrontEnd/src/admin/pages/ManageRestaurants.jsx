import { useEffect, useState } from "react";
import { Table, Button, Spinner, Card } from "react-bootstrap";
import { deleteRestaurant, getAllRestaurants } from "../../api/restaurantApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AddRestaurant } from "../../pages/restaurant/AddRestaurant";

export const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);

  const fetchRestaurants = async () => {
    try {
      const response = await getAllRestaurants();
      setRestaurants(response);
    } catch (error) {
      console.error("Failed to fetch restaurants", error);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchRestaurants();
      setLoading(false);
    };

    load();
  }, []);

  const handleDeleteRestaurant = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This restaurant will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRestaurant(id);

        setRestaurants((prev) => prev.filter((r) => r.id !== id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Restaurant deleted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to delete restaurant", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete restaurant.",
        });
      }
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
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Manage Restaurants</h4>

        <Button
          variant="success"
          className="px-4 shadow-sm"
          onClick={() => setShowAddRestaurant(true)}
        >
          Add Restaurant
        </Button>
      </div>

      <AddRestaurant
        show={showAddRestaurant}
        onHide={() => setShowAddRestaurant(false)}
        onRestaurantAdded={fetchRestaurants}
      />

      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: "60px" }}>S.N</th>
                <th>Image</th>
                <th>Restaurant Name</th>
                <th>Address</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {restaurants.length > 0 ? (
                restaurants.map((restaurant, index) => (
                  <tr key={restaurant.id}>
                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={`http://localhost:2058/FoodDeliveryApp/api/restaurant/${restaurant.id}/image`}
                        alt={restaurant.name}
                        style={{
                          width: "60px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    </td>

                    <td className="fw-semibold">{restaurant.name}</td>

                    <td className="text-muted">{restaurant.address}</td>

                    <td className="text-center">
                      <Link
                        to={`/admin/restaurant/${restaurant.id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        View
                      </Link>

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteRestaurant(restaurant.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No restaurants found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};
