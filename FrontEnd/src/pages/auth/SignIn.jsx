import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/userApi";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export const SignIn = ({ onSwitch, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      login(res.data);

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome To FoodFusion!",
        timer: 1500,
        showConfirmButton: false,
      });

      onClose();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Email or password didn't match!";

      toast.error(message, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="p-3">
      <button
        onClick={onClose}
        className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
        style={{ width: "35px", height: "35px" }}
      >
        <IoClose size={20} />
      </button>

      <h4 className="text-center mb-3 fw-bold">Welcome Back 👋</h4>

      <p className="text-center text-muted mb-4">
        Login to continue ordering delicious food 🍔
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control rounded-3"
            id="email"
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="email">Email address</label>
        </div>

        <div className="mb-3 position-relative">
          <div className="form-floating">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control rounded-3 pe-5"
              id="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="password">Password</label>
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
          Login
        </button>
      </form>

      {/* <div className="text-center my-3 text-muted">or</div>

      <button className="btn btn-outline-dark w-100 rounded-pill">
        Continue with Google
      </button> */}

      <p className="text-center mt-4 mb-0">
        Don’t have an account?
        <span
          style={{ cursor: "pointer", color: "#ffc107", fontWeight: "500" }}
          onClick={onSwitch}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};
