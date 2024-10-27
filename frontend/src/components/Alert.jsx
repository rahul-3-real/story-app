import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { hideAlert } from "../store/slices/alertSlice";

const Alert = () => {
  const dispatch = useDispatch();
  const { message, type, visible } = useSelector((state) => state.alert);

  const handleCloseAlert = () => {
    dispatch(hideAlert());
  };

  useEffect(() => {
    let timeoutId;
    if (visible) {
      timeoutId = setTimeout(() => {
        dispatch(hideAlert());
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type}`}>
      <p>{message}</p>
      <button className="close-alert-btn" onClick={handleCloseAlert}>
        <IoMdClose />
      </button>
    </div>
  );
};

export default Alert;
