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
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        <div className="form-floating mb-3">
          <input
            name="userName"
            className="form-control rounded-3"
            placeholder="Name"
            required
            onChange={handleChange}
          />
          <label>Full Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className="form-control rounded-3"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <label>Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            name="phoneNumber"
            className="form-control rounded-3"
            placeholder="Phone"
            required
            onChange={handleChange}
          />
          <label>Phone Number</label>
        </div>

        <div className="mb-3 position-relative">
          <div className="form-floating">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control rounded-3 pe-5"
              placeholder="Password"
              required
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

        <button className="btn btn-warning w-100 rounded-pill fw-semibold">
          Create Account
        </button>
      </form>

      {/* <div className="text-center my-3 text-muted">or</div>

      <button className="btn btn-outline-dark w-100 rounded-pill">
        Continue with Google
      </button> */}

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
