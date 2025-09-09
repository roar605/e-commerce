import express from "express"
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
import { createNewOrder, getSingleOrder } from "../controller/orderController.js";
const router = express.Router();

router.route("/new/order").post(verifyUserAuth,createNewOrder);
router.route("/order/:id").post(verifyUserAuth,roleBasedAccess("admin"),getSingleOrder);

export default router;