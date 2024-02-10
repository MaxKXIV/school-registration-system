import express from "express";
import { getClasses } from "../controllers/registration.controller.js";
const router = express.Router();

router.get("/", getClasses);

export default router;
