import { useEffect } from "react";
import "./Modal.css";

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
      <div className={`modal__container scale-in ${className}`}>
        <button
          className="modal__close-button smooth-transition button-hover-scale focus-ring"
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
