import axios from "axios";
import { useState, useRef } from "react";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { updateProfile } from "../../../store/slices/authSlice";
import { showAlert } from "../../../store/slices/alertSlice";
import setCanvasPreview from "./setCanvasPreview";

const ProfileAvatarUpdate = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();

  const ASPECT_RATION = 1;
  const MIN_DIMENTION = 200;

  // Remove Avatar Handler
  const removeAvatarHandler = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/remove-avatar`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedUser = { ...response.data.data };
      if (!updatedUser.avatar) {
        updatedUser.avatar = null;
      }
      dispatch(updateProfile(updatedUser));
      dispatch(
        showAlert({
          message: response.data.message,
          type: "success",
        })
      );
      navigate("/profile");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during removal.";
      dispatch(
        showAlert({
          message: errorMessage,
          type: "error",
        })
      );
    }
  };

  // Handle Upload Image
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      dispatch(showAlert({ message: "Please select a file", type: "error" }));
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;

        if (naturalWidth < MIN_DIMENTION || naturalHeight < MIN_DIMENTION) {
          dispatch(
            showAlert({
              message: "Image size should be at least 200x200 pixels",
              type: "error",
            })
          );
          setImgSrc("");
        }
      });

      setImgSrc(imageUrl);
    });

    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENTION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATION,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);

    setCrop(centeredCrop);
  };

  const uploadAvatarHandler = async () => {
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );
    const dataUrl = previewCanvasRef.current.toDataURL();

    try {
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const formData = new FormData();
      formData.append("avatar", blob, "avatar.png");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      dispatch(updateProfile(response.data.data));
      dispatch(
        showAlert({
          message: response.data.message,
          type: "success",
        })
      );
      navigate("/profile");
    } catch (error) {
      dispatch(
        showAlert({
          message:
            error.response?.data?.message || "An error occurred during upload.",
          type: "error",
        })
      );
    }
  };

  return (
    <>
      <p className="mb-7">Upload your new avatar</p>

      <div className="mb-4">
        <label className="upload-avatar-btn">
          <span>Choose Profile Picture</span>
          <input type="file" accept="image/*" onChange={onSelectFile} />
        </label>
      </div>

      {imgSrc && (
        <>
          <ReactCrop
            crop={crop}
            keepSelection
            aspect={ASPECT_RATION}
            minWidth={MIN_DIMENTION}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "80vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <button
            className="button button-outline button-block button-sm mt-4"
            onClick={uploadAvatarHandler}
          >
            Crop & Upload
          </button>
        </>
      )}

      {user?.avatar && (
        <button
          className="button button-error-outline button-sm mt-5"
          type="button"
          onClick={() => removeAvatarHandler()}
        >
          <BsTrash3 />
          <span>Remove Existing Profile</span>
        </button>
      )}

      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default ProfileAvatarUpdate;
