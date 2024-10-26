import { Router } from "express";

import {
  loginController,
  registerController,
  logoutController,
  refreshAccessTokenController,
  getUserProfileController,
  forgotPasswordController,
  forgotPasswordRequestController,
  resetPasswordController,
  verifyAccountController,
  verifyAccountRequestController,
  updateEmailController,
  updateProfileController,
  updateAvatarController,
} from "../controllers/user.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import uploadMiddleware from "../middlewares/multer.middleware.js";

const router = Router();

// Routes
router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").post(verifyUser, logoutController);

router.route("/refresh-access-token").post(refreshAccessTokenController);
router.route("/profile").get(verifyUser, getUserProfileController);

router.route("/forgot-password").post(forgotPasswordController);
router.route("/forgot-password-request").patch(forgotPasswordRequestController);
router.route("/reset-password").patch(verifyUser, resetPasswordController);

router.route("/verify-account").patch(verifyAccountController);
router
  .route("/verify-account-request")
  .patch(verifyUser, verifyAccountRequestController);

router.route("/update-email").patch(verifyUser, updateEmailController);
router.route("/update-profile").patch(verifyUser, updateProfileController);
router
  .route("/update-avatar")
  .patch(
    verifyUser,
    uploadMiddleware("avatar", ["jpg", "jpeg", "png", "gif", "svg"]),
    updateAvatarController
  );

export default router;
