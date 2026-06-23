import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { googleLogin, loginUser } from "../../api/userApi";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

export const SignIn = ({ onSwitch, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        <div className="form-floating mb-1">
          <input
            type="email"
            className={`form-control rounded-3 ${
              errors.email ? "is-invalid" : ""
            }`}
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              if (errors.email) {
                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
              }
            }}
          />

          <label htmlFor="email">Email address</label>
        </div>

        {errors.email && (
          <div className="invalid-feedback d-block mb-3">{errors.email}</div>
        )}

        <div className="mb-1 position-relative">
          <div className="form-floating">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control rounded-3 pe-5 ${
                errors.password ? "is-invalid" : ""
              }`}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (errors.password) {
                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                  }));
                }
              }}
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

        {errors.password && (
          <div className="invalid-feedback d-block mb-3">{errors.password}</div>
        )}

        <button className="btn btn-warning w-100 rounded-pill fw-semibold">
          Login
        </button>
      </form>

      <div className="text-center my-3 text-muted">or</div>

      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const res = await googleLogin({
              token: credentialResponse.credential,
            });

            login(res.data);

            Swal.fire({
              icon: "success",
              title: "Google Login Successful",
              text: "Welcome To FoodFusion!",
              timer: 1500,
              showConfirmButton: false,
            });

            onClose();
          } catch (error) {
            toast.error("Google Login Failed");
          }
        }}
        onError={() => {
          toast.error("Google Login Failed");
        }}
      />

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
