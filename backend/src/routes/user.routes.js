import { Router } from "express";

import {
  loginController,
  registerController,
  logoutController,
  refreshAccessTokenController,
  getUserProfileController,
} from "../controllers/user.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

// Routes
router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").post(verifyUser, logoutController);

router.route("/refresh-access-token").post(refreshAccessTokenController);
router.route("/profile").get(verifyUser, getUserProfileController);

export default router;
