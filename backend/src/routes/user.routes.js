import { Router } from "express";
import {
  userLogin,
  userRegistration,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.post("/register", upload.single("avatar"), userRegistration);
userRouter.post("/login", userLogin);

export default userRouter;
