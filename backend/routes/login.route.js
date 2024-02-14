import express from "express";
import { checkLogin } from "../controllers/login.controller.js";

const router = express.Router();
router.post("/", checkLogin);

export default router;
