import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "../Modal/Modal";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onSwitchToSignup, showInfoModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, isLoading } = useAuth();

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

    try {
      const response = await login(email, password);

      if (response && response.user) {
        // Show success notification
        showInfoModal("Login successful!");
        onClose();
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        general: error.message || "Login failed. Please try again.",
      });
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
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} className="login-modal">
      <h2 className="modal__title">Sign In</h2>

      {errors.general && (
        <div className="login-modal__error-banner slide-in-bottom">
          {errors.general}
        </div>
      )}

      <form className="login-modal__form" onSubmit={handleSubmit}>
        <div className="login-modal__field">
          <label className="login-modal__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`login-modal__input smooth-transition focus-ring ${
              errors.email ? "login-modal__input--error" : ""
            }`}
            placeholder="Enter email"
            value={email}
            onChange={handleInputChange(setEmail, "email")}
            disabled={isLoading}
            required
            autoComplete="email"
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span
              id="email-error"
              className="login-modal__error slide-in-bottom"
            >
              {errors.email}
            </span>
          )}
        </div>

        <div className="login-modal__field">
          <label className="login-modal__label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`login-modal__input smooth-transition focus-ring ${
              errors.password ? "login-modal__input--error" : ""
            }`}
            placeholder="Enter password"
            value={password}
            onChange={handleInputChange(setPassword, "password")}
            disabled={isLoading}
            required
            minLength="8"
            autoComplete="current-password"
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <span
              id="password-error"
              className="login-modal__error slide-in-bottom"
            >
              {errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="login-modal__submit smooth-transition button-hover-scale focus-ring"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="login-modal__switch fade-in">
        <span>Don't have an account?</span>
        <button
          type="button"
          className="login-modal__switch-button smooth-transition hover-opacity focus-ring"
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
