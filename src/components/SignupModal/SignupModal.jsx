import { useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import Modal from "../Modal/Modal";
import "./SignupModal.css";

function SignupModal({ isOpen, onClose, onSwitchToLogin, showInfoModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const { register, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    } else if (username.trim().length > 30) {
      newErrors.username = "Username must be less than 30 characters";
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
      const response = await register(email, password, username);
      
      if (response && response.user) {
        // Show success notification
        showInfoModal('Registration successful! Please sign in.');
        // Switch to login modal
        onSwitchToLogin();
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ general: error.message || "Registration failed. Please try again." });
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
    setUsername("");
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} className="signup-modal">
      <h2 className="modal__title">Sign Up</h2>

      {errors.general && (
        <div className="signup-modal__error-banner slide-in-bottom">
          {errors.general}
        </div>
      )}

      <form className="signup-modal__form" onSubmit={handleSubmit}>
        <div className="signup-modal__field">
          <label className="signup-modal__label" htmlFor="signup-email">
            Email
          </label>
          <input
            type="email"
            id="signup-email"
            className={`signup-modal__input smooth-transition focus-ring ${
              errors.email ? "signup-modal__input--error" : ""
            }`}
            placeholder="Enter email"
            value={email}
            onChange={handleInputChange(setEmail, "email")}
            disabled={isLoading}
            required
            autoComplete="email"
            aria-describedby={errors.email ? "signup-email-error" : undefined}
          />
          {errors.email && (
            <span
              id="signup-email-error"
              className="signup-modal__error slide-in-bottom"
            >
              {errors.email}
            </span>
          )}
        </div>

        <div className="signup-modal__field">
          <label className="signup-modal__label" htmlFor="signup-password">
            Password
          </label>
          <input
            type="password"
            id="signup-password"
            className={`signup-modal__input smooth-transition focus-ring ${
              errors.password ? "signup-modal__input--error" : ""
            }`}
            placeholder="Enter password"
            value={password}
            onChange={handleInputChange(setPassword, "password")}
            disabled={isLoading}
            required
            minLength="8"
            autoComplete="new-password"
            aria-describedby={
              errors.password ? "signup-password-error" : undefined
            }
          />
          {errors.password && (
            <span
              id="signup-password-error"
              className="signup-modal__error slide-in-bottom"
            >
              {errors.password}
            </span>
          )}
        </div>

        <div className="signup-modal__field">
          <label className="signup-modal__label" htmlFor="signup-username">
            Username
          </label>
          <input
            type="text"
            id="signup-username"
            className={`signup-modal__input smooth-transition focus-ring ${
              errors.username ? "signup-modal__input--error" : ""
            }`}
            placeholder="Enter your username"
            value={username}
            onChange={handleInputChange(setUsername, "username")}
            disabled={isLoading}
            required
            minLength="2"
            maxLength="20"
            autoComplete="username"
            aria-describedby={
              errors.username ? "signup-username-error" : undefined
            }
          />
          {errors.username && (
            <span
              id="signup-username-error"
              className="signup-modal__error slide-in-bottom"
            >
              {errors.username}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="signup-modal__submit smooth-transition button-hover-scale focus-ring"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <div className="signup-modal__switch fade-in">
        <span>Already have an account?</span>
        <button
          type="button"
          className="signup-modal__switch-button smooth-transition hover-opacity focus-ring"
          onClick={onSwitchToLogin}
          disabled={isLoading}
        >
          Sign In
        </button>
      </div>
    </Modal>
  );
}

export default SignupModal;
