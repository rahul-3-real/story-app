import fs from "fs";
import path from "path";
import multer from "multer";

import ApiError from "../utils/apiError.js";

// Uploading files Middleware
// It uploads files in public/route/year/month/day/filename
export const uploadMiddleware = (
  folderName,
  validExtensions = [],
  multiple = false
) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Get current date and destination path logic
      const currentDate = new Date();
      const year = String(currentDate.getFullYear());
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const destinationPath = path.join(
        `./${process.env.MEDIA_UPLOAD_FOLDER}`,
        folderName,
        year,
        month,
        day
      );

      // Create the directory if it does not exist
      fs.mkdirSync(destinationPath, { recursive: true });

      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, folderName + "-" + uniqueSuffix + "." + extension);
    },
  });

  // File filter to allow only files with valid extensions
  const fileFilter = (req, file, cb) => {
    // Create a regex from the valid extensions array
    const fileTypes = new RegExp(validExtensions.join("|"));
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(
        new ApiError(
          400,
          `Only files with the following extensions are allowed: ${validExtensions.join(", ")}`
        )
      );
    }
  };

  // Return the multer middleware based on the multiple flag
  if (multiple) {
    return multer({ storage: storage, fileFilter }).array(folderName);
  } else {
    return multer({ storage: storage, fileFilter }).single(folderName);
  }
};

export default uploadMiddleware;
