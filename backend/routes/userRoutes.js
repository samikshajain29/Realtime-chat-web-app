import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  editProfile,
  getCurrentUser,
  getOtherUsers,
  search,
} from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser);
userRouter.get("/others", isAuth, getOtherUsers);
userRouter.put("/profile", isAuth, upload.single("image"), editProfile);
userRouter.get("/search", isAuth, search);

export default userRouter;
