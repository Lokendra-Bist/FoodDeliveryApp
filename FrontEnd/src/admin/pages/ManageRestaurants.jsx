import { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { deleteRestaurant, getAllRestaurants } from "../../api/restaurantApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getAllRestaurants();
        setRestaurants(response);
      } catch (error) {
        console.error("Failed to fetch restaurants", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
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
      <h4 className="mb-4">Manage Restaurants</h4>

      <Table bordered hover responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>S.N</th>
            <th>Image</th>
            <th>Restaurant Name</th>
            <th>Location</th>

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

                <td>{restaurant.name}</td>
                <td>{restaurant.address}</td>

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
              <td colSpan="6" className="text-center text-muted">
                No restaurants found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
