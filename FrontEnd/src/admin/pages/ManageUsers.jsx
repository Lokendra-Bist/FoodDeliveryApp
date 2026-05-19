import { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Badge } from "react-bootstrap";

import Swal from "sweetalert2";
import { deleteUser, fetchUser } from "../../api/userApi";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetchUser();

      setUsers(response.data);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch users",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "User deleted successfully",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to delete user",
      });
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Users Management</h3>

        <Badge bg="dark">Total Users: {users.length}</Badge>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>

              <th>Full Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Role</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>{user.userName}</td>

                  <td>{user.email}</td>

                  <td>{user.phoneNumber}</td>

                  <td>
                    <Badge>{user.roles}</Badge>
                  </td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
