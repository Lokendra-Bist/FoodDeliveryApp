import { useState, useRef, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import toast from "react-hot-toast";
import { addNewCategory, updateCategory } from "../../api/categoryApi";

export const AddEditCategoryForm = ({ categoryData, onSuccess }) => {
  const [category, setCategory] = useState({ name: "", image: null });
  const [preview, setPreview] = useState(null);
  const photoRef = useRef();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categoryData) {
      setCategory({ name: categoryData.name, image: null });
      setPreview(`data:image/jpeg;base64,${categoryData.image}`);
    }
  }, [categoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const trimmedName = category.name.trim();

    if (!trimmedName) {
      newErrors.name = "Category name is required";
    } else if (trimmedName.length < 3) {
      newErrors.name = "Category name must be at least 3 characters";
    } else if (trimmedName.length > 50) {
      newErrors.name = "Category name cannot exceed 50 characters";
    }

    if (!categoryData && !category.image) {
      newErrors.image = "Image is required";
    }

    if (category.image) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];

      if (!allowedTypes.includes(category.image.type)) {
        newErrors.image = "Only JPG, JPEG, PNG and WEBP images are allowed";
      }

      if (category.image.size > 2 * 1024 * 1024) {
        newErrors.image = "Image size must be less than 2MB";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", category.name.trim());

      if (category.image) {
        formData.append("image", category.image);
      }

      if (categoryData) {
        await updateCategory(categoryData.id, formData);
        toast.success("Category updated successfully");
      } else {
        await addNewCategory(formData);
        toast.success("Category added successfully");
      }

      setCategory({ name: "", image: null });
      setPreview(null);
      setErrors({});
      if (photoRef.current) photoRef.current.value = "";

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || "Failed to save category");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow-sm bg-light"
    >
      <h4 className="mb-4 text-center">
        {categoryData ? "Edit Category" : "Add Category"}
      </h4>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={category.name}
          onChange={handleChange}
          placeholder="Enter category name"
          required
          className="shadow-sm"
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          ref={photoRef}
          onChange={handleImageChange}
          className="shadow-sm"
          isInvalid={!!errors.image}
        />
        <Form.Control.Feedback type="invalid">
          {errors.image}
        </Form.Control.Feedback>
        {categoryData && !category.image && (
          <Form.Text className="text-muted">
            Current image is shown below. Choose a new file to replace it.
          </Form.Text>
        )}
      </Form.Group>

      {preview && (
        <div className="text-center mb-3">
          <Image
            src={preview}
            alt="Preview"
            rounded
            width="150"
            className="border shadow-sm"
          />
        </div>
      )}

      <div className="d-grid">
        <Button type="submit" variant="primary" size="lg">
          {categoryData ? "Update Category" : "Add Category"}
        </Button>
      </div>
    </Form>
  );
};
