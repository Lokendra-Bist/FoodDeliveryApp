import { useState } from "react";
import { registerUser } from "../../api/userApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export const SignUp = ({ onSwitch, onClose }) => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.userName.trim()) {
      newErrors.userName = "Full name is required";
    } else if (form.userName.trim().length < 3) {
      newErrors.userName = "Name must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^9\d{9}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Enter valid Nepal phone number";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase and number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await registerUser(form);
      login(response.data);
      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome! Account created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
      navigate("/");
    } catch (error) {
      const message = error?.response?.data?.message || "Registration failed";
      toast.error(message, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="p-3 position-relative">
      <button
        onClick={onClose}
        className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
        style={{ width: "35px", height: "35px" }}
      >
        <IoClose size={20} />
      </button>

      <h4 className="text-center fw-bold mb-2">Create Account 🚀</h4>

      <p className="text-center text-muted mb-4">
        Join us and start ordering your favorite food 🍕
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-1">
          <input
            name="userName"
            value={form.userName}
            className={`form-control rounded-3 ${
              errors.userName ? "is-invalid" : ""
            }`}
            placeholder="Name"
            onChange={handleChange}
          />

          <label>Full Name</label>
        </div>

        {errors.userName && (
          <div className="invalid-feedback d-block mb-3">{errors.userName}</div>
        )}

        <div className="form-floating mb-1">
          <input
            type="email"
            name="email"
            value={form.email}
            className={`form-control rounded-3 ${
              errors.email ? "is-invalid" : ""
            }`}
            placeholder="Email"
            onChange={handleChange}
          />

          <label>Email</label>
        </div>

        {errors.email && (
          <div className="invalid-feedback d-block mb-3">{errors.email}</div>
        )}

        <div className="form-floating mb-1">
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            className={`form-control rounded-3 ${
              errors.phoneNumber ? "is-invalid" : ""
            }`}
            placeholder="Phone"
            onChange={handleChange}
          />

          <label>Phone Number</label>
        </div>

        {errors.phoneNumber && (
          <div className="invalid-feedback d-block mb-3">
            {errors.phoneNumber}
          </div>
        )}

        <div className="mb-1 position-relative">
          <div className="form-floating">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              className={`form-control rounded-3 pe-5 ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Password"
              onChange={handleChange}
            />

            <label>Password</label>
          </div>

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "50%",
              right: "15px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#6c757d",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errors.password && (
          <div className="invalid-feedback d-block mb-3">{errors.password}</div>
        )}

        <button className="btn btn-warning w-100 rounded-pill fw-semibold">
          Create Account
        </button>
      </form>

      <div className="text-center my-3 text-muted">or</div>

      <button className="btn btn-outline-dark w-100 rounded-pill">
        Continue with Google
      </button>

      <p className="text-center mt-4 mb-0">
        Already have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "#ffc107", fontWeight: "500" }}
          onClick={onSwitch}
        >
          Login
        </span>
      </p>
    </div>
  );
};
