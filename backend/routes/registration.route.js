import express from "express";
import {
  getCartByID,
  getClasses,
  getCourseSymbols,
  getSectionByID,
  insertIntoCart,
} from "../controllers/registration.controller.js";
const router = express.Router();
router.get("/cart/:id", getCartByID);
router.get("/getcourses", getCourseSymbols);
router.get("/:id", getSectionByID);
router.get("/", getClasses);

router.post("/:id", insertIntoCart);
export default router;
