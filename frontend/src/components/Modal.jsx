import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Modal = ({ show, onClose, redirectTo, children }) => {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleClose = () => {
    navigate(redirectTo);
    if (onClose) onClose();
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal")) {
      handleClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>
          <IoMdClose />
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
