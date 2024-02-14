import express from "express";
import {
  deleteFromCart,
  getCartByID,
  getClasses,
  getCourseSymbols,
  getSectionByID,
  insertIntoCart,
  registerForClass,
} from "../controllers/registration.controller.js";
const router = express.Router();
router.get("/cart/:id", getCartByID);
router.get("/getcourses", getCourseSymbols);
router.get("/:id", getSectionByID);
router.get("/", getClasses);

router.post("/:id", insertIntoCart);
router.post("/register/:id", registerForClass);

router.patch("/cart/:id", deleteFromCart);
export default router;
