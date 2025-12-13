import { useState } from "react";
import Modal from "../Modal/Modal";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual authentication API call
      console.log("Login attempt:", { email, password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Handle successful login
      // - Store auth token
      // - Update user state
      // - Close modal
      onClose();
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleModalClose = () => {
    // Clear form when closing
    setEmail("");
    setPassword("");
    setErrors({});
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} className="login-modal">
      <h2 className="modal__title">Sign In</h2>

      {errors.general && (
        <div className="login-modal__error-banner">{errors.general}</div>
      )}

      <form className="login-modal__form" onSubmit={handleSubmit}>
        <div className="login-modal__field">
          <label className="login-modal__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`login-modal__input ${
              errors.email ? "login-modal__input--error" : ""
            }`}
            placeholder="Enter email"
            value={email}
            onChange={handleInputChange(setEmail, "email")}
            disabled={isLoading}
          />
          {errors.email && (
            <span className="login-modal__error">{errors.email}</span>
          )}
        </div>

        <div className="login-modal__field">
          <label className="login-modal__label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`login-modal__input ${
              errors.password ? "login-modal__input--error" : ""
            }`}
            placeholder="Enter password"
            value={password}
            onChange={handleInputChange(setPassword, "password")}
            disabled={isLoading}
          />
          {errors.password && (
            <span className="login-modal__error">{errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className="login-modal__submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="login-modal__switch">
        <span>Don't have an account?</span>
        <button
          type="button"
          className="login-modal__switch-button"
          onClick={onSwitchToSignup}
          disabled={isLoading}
        >
          Sign Up
        </button>
      </div>
    </Modal>
  );
}

export default LoginModal;
