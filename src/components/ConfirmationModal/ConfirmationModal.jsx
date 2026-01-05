import React from "react";
import Modal from "../Modal/Modal";
import "./ConfirmationModal.css";

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  isLoading = false,
}) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="confirmation-modal">
      <h2 className="modal__title">{title}</h2>

      <div className="confirmation-modal__content">
        <p className="confirmation-modal__message">{message}</p>
      </div>

      <div className="confirmation-modal__actions">
        <button
          type="button"
          className="confirmation-modal__cancel"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {cancelText}
        </button>
        <button
          type="button"
          className={`confirmation-modal__confirm ${
            isDestructive ? "confirmation-modal__confirm--destructive" : ""
          }`}
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : confirmText}
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
