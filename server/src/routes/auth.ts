import express from "express";
import { signup } from "../controllers/signup";
import { verifyOtp } from "../controllers/verifyOtp";
import { login } from "../controllers/login";
import { authorize } from "../middleware/authorize";
import { addUsers } from "../controllers/addUser";

const router = express.Router();

router.post("/signup", signup, addUsers);
router.post("/verifySignUpOtp", verifyOtp);
router.post("/login", login);
router.post("/verifyLogInOtp", verifyOtp);
router.get("/authorize", authorize);

export default router;
