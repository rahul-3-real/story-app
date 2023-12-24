import { Router } from "express";
import { userRegistration } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.post("/register", upload.single("avatar"), userRegistration);

export default userRouter;
