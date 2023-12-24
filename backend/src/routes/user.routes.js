import { Router } from "express";
import {
  changePassword,
  getCurrentUser,
  refreshAccessToken,
  updateAvatarImage,
  updateUserProfile,
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", upload.single("avatar"), userRegistration);
userRouter.post("/login", userLogin);
userRouter.post("/logout", verifyJWT, userLogout);
userRouter.post("/refresh-access", refreshAccessToken);
userRouter.patch("/change-password", verifyJWT, changePassword);
userRouter.get("/user-info", verifyJWT, getCurrentUser);
userRouter.patch("/update-profile", verifyJWT, updateUserProfile);
userRouter.patch(
  "/update-avatar",
  verifyJWT,
  upload.single("avatar"),
  updateAvatarImage
);

export default userRouter;
