import { useEffect } from "react";
import "./Modal.css";

// Simple close button icon component
const CloseIcon = ({ className, color = "white" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Modal({ isOpen, onClose, children, className = "" }) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  // Handle backdrop click
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal fade-in" onClick={handleBackdropClick}>
      <div className="modal__wrapper">
        <button
          className="modal__close-button smooth-transition button-hover-scale focus-ring"
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          <CloseIcon className="modal__close-icon" color="white" />
        </button>
        <div className={`modal__container scale-in ${className}`}>
          <div className="modal__header">
            <div className="modal__logo">NewsExplorer</div>
            <button
              className="modal__close-button"
              onClick={onClose}
              type="button"
              aria-label="Close modal"
            >
              <CloseIcon className="modal__close-icon" color="#ffffff" />
            </button>
          </div>
          <div className="modal__content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
