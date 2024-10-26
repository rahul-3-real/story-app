import { Router } from "express";

import {
  loginController,
  registerController,
} from "../controllers/user.controllers.js";

const router = Router();

// Routes
router.route("/register").post(registerController);
router.route("/login").post(loginController);

export default router;
