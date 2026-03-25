import { useEffect, useState } from "react";
import {
  Table,
  Image,
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
} from "react-bootstrap";

import {
  deleteCategory,
  getAllCategoriesByPagination,
} from "../../api/categoryApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AddEditCategoryForm } from "../../components/category/AddEditCategoryForm";
import { PaginationControl } from "../../components/common/PaginationControl";

export const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategoriesByPagination(page, size, search);

      setCategories(data.content);
      setTotalPages(data.totalPages || data.page?.totalPages || 0);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, size, search]);

  const handleAdd = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Manage Categories</h2>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => {
              setPage(0);
              setSearch(e.target.value);
            }}
          />
        </Col>

        <Col md={3}>
          <Form.Select
            value={size}
            onChange={(e) => {
              setPage(0);
              setSize(Number(e.target.value));
            }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </Form.Select>
        </Col>

        <Col md={3} className="text-end">
          <Button variant="primary" onClick={handleAdd}>
            Add Category
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Image</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category.id}>
                <td>{page * size + index + 1}</td>

                <td>
                  <Image
                    src={`data:image/jpeg;base64,${category.image}`}
                    width="100"
                    height="80"
                    rounded
                  />
                </td>

                <td>{category.name}</td>

                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <PaginationControl
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategory ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddEditCategoryForm
            categoryData={editingCategory}
            onSuccess={() => {
              fetchCategories();
              setShowModal(false);
            }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};
