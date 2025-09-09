import express from "express";
import { getUserDetails, loginUser, logoutUser, registerUser, requestPasswordReset, resetPassword } from "../controller/userController.js";
import { verifyUserAuth } from "../middleware/userAuth.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(requestPasswordReset);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").post(verifyUserAuth,getUserDetails);


export default router;