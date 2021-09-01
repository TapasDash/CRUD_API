import express from "express";

import {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  modifyCourse,
} from "../controllers/courseController.js";

import { authUser, registerUser } from "../controllers/userController.js";
import { Admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/register-user").post(registerUser);
router.route("get-all=courses").get(protect, Admin, getAllCourses);
router.route("get-course/:id").get(protect, Admin, getCourseById);
router.route("/add-course").post(protect, Admin, addCourse);
router.route("/delete-course/:id").delete(protect, Admin, deleteCourse);
router.route("/modify-course/:id").patch(protect, Admin, modifyCourse);

export default router;
