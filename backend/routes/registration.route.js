import express from "express";
import {
  getClasses,
  getCourseSymbols,
  getSectionByID,
} from "../controllers/registration.controller.js";
const router = express.Router();

router.get("/getcourses", getCourseSymbols);
router.get("/:id", getSectionByID);
router.get("/", getClasses);

export default router;
