import { useState } from "react";
import {
  Table,
  Button,
  Image,
  Badge,
  Row,
  Col,
  Form,
  ListGroup,
  Card,
} from "react-bootstrap";
import { EditMenuItem } from "./EditMenuItem";
import { deleteMenuItem, updateMenuItemById } from "../../api/menuApi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AddMenu } from "../../pages/menu/AddMenu";

export const MenuItemTable = ({
  restaurant,
  menuItems,
  setMenuItems,
  refreshMenuItems,
}) => {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const handleDeleteMenuItem = async (menuId) => {
    const result = await Swal.fire({
      title: "Delete Menu Item?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMenuItem(menuId);

      setMenuItems((prev) => prev.filter((item) => item.id !== menuId));

      Swal.fire("Deleted!", "Menu item removed successfully.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to delete menu item.", "error");
    }
  };

  const updateMenuItem = async (menuId, item) => {
    try {
      const updated = await updateMenuItemById(menuId, item);

      setMenuItems((prev) => prev.map((i) => (i.id === menuId ? updated : i)));

      setShowEditMenu(false);

      toast.success("Menu item updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);

      toast.error("Failed to update menu item");
    }
  };

  const categories = [
    "ALL",
    ...new Set(menuItems.map((item) => item.categoryName)),
  ];

  const filteredMenu = menuItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "ALL" || item.categoryName === selectedCategory;

    return matchSearch && matchCategory;
  });

  const foodBadge = (type) => {
    if (type === "VEG") return <Badge bg="success">VEG</Badge>;
    if (type === "NON_VEG") return <Badge bg="danger">NON VEG</Badge>;
    if (type === "EGG") return <Badge bg="warning">EGG</Badge>;
    if (type === "VEGAN") return <Badge bg="primary">VEGAN</Badge>;
  };

  return (
    <div>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <h4 className="fw-bold mb-1">Menu Management</h4>

              <div className="text-muted">
                {restaurant.name} • {menuItems.length} Items
              </div>
            </Col>

            <Col md={4}>
              <Form.Control
                placeholder="Search menu items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col md={2} className="text-end">
              <Button variant="success" onClick={() => setShowAddMenu(true)}>
                + Add Menu
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col lg={3} md={4} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="mb-3 fw-bold">Categories</h6>

              <ListGroup>
                {categories.map((cat) => (
                  <ListGroup.Item
                    key={cat}
                    action
                    active={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9} md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Table bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Food Type</th>
                    <th>Price</th>
                    <th>Discount Price</th>
                    <th width="140">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMenu.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.image && (
                          <Image
                            src={`data:image/jpeg;base64,${item.image}`}
                            rounded
                            style={{
                              width: "70px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>

                      <td className="fw-semibold">{item.name}</td>

                      <td>{item.categoryName}</td>

                      <td>{foodBadge(item.foodType)}</td>

                      <td>Rs {item.price}</td>

                      <td>Rs {item.discountPrice}</td>

                      <td>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={() => {
                            setSelectedMenuItem(item);
                            setShowEditMenu(true);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          type="button"
                          variant="outline-danger"
                          size="sm"
                          className="ms-2"
                          onClick={() => handleDeleteMenuItem(item.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedMenuItem && (
        <EditMenuItem
          show={showEditMenu}
          handleClose={() => setShowEditMenu(false)}
          menuItem={selectedMenuItem}
          onSave={updateMenuItem}
          restaurantId={restaurant.id}
        />
      )}

      {showAddMenu && (
        <AddMenu
          show={showAddMenu}
          handleClose={() => setShowAddMenu(false)}
          onSuccess={refreshMenuItems}
          restaurantId={restaurant.id}
        />
      )}
    </div>
  );
};

export default MenuItemTable;
