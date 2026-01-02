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
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="info-modal">
      <h2 className="modal__title">{title}</h2>

      <div className="info-modal__actions">
        <button
          type="button"
          className="info-modal__button smooth-transition hover-opacity focus-ring"
          onClick={onClose}
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
}

export default InfoModal;
