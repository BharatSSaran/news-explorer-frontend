import Modal from "../Modal/Modal";
import "./InfoModal.css";

function InfoModal({
  isOpen,
  onClose,
  title = "Information",
  message = "",
  type = "info", // "info", "success", "error"
  buttonText = "OK",
}) {
  const getIconForType = (type) => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "⚠";
      default:
        return "ⓘ";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="info-modal">
      <div className={`info-modal__icon info-modal__icon--${type}`}>
        {getIconForType(type)}
      </div>

      <h2 className="modal__title">{title}</h2>

      <div className="info-modal__content">
        <p className="info-modal__message">{message}</p>
      </div>

      <div className="info-modal__actions">
        <button type="button" className="info-modal__button" onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </Modal>
  );
}

export default InfoModal;
