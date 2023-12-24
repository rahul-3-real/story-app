import { Router } from "express";
import {
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

export default userRouter;
