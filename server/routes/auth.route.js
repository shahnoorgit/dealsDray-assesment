import express from "express";
import {
  loginuser,
  logoutuser,
  signupuser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginuser);
router.post("/signup", signupuser);
router.post("/logout", logoutuser);

export default router;
