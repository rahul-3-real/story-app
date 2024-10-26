import { Router } from "express";

import { registerController } from "../controllers/user.controllers.js";

const router = Router();

// Routes
router.route("/register").post(registerController);

export default router;
