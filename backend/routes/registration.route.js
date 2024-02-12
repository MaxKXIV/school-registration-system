import express from "express";
import {
  getClasses,
  getCourseSymbols,
} from "../controllers/registration.controller.js";
const router = express.Router();

router.get("/getcourses", getCourseSymbols);
router.get("/", getClasses);

export default router;
