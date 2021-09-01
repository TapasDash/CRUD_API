import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  if (courses)
    return res.status(200).json({
      success: true,
      message: "Data fetched sucesfully.",
      courses,
    });
  else
    return res.status(404).json({
      success: false,
      message: "Data is empty!.",
    });
});

const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (courses)
    return res.status(200).json({
      success: true,
      message: "Course fetched sucesfully.",
      course,
    });
  else
    return res.status(404).json({
      success: false,
      message: "Course not found!.",
    });
});

const addCourse = asyncHandler(async (req, res) => {
  const { name, duration, cost } = req.body;
  const courseExists = await Course.findOne({ name });

  if (courseExists)
    return res.status(401).json({
      sucess: false,
      message: "Course already exists!",
    });

  const user = await Course.create({
    name,
    duration,
    cost,
  });

  if (user)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      duration: user.duration,
      cost: user.cost,
    });
  else
    return res.status(401).json({
      sucess: false,
      message: "Invalid data!",
    });
});

const modifyCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, duration, cost } = req.body;
  const course = await Course.findById(id).select("name duration cost");
  const { nModified } = await course.updateOne({
    name: name || course.name,
    duration: duration || course.duration,
    cost: cost || course.cost,
  });
  if (nModified)
    res.status(201).json({
      sucess: true,
      message: "Course updated sucessfully.",
    });
  else
    return res.status(401).json({
      sucess: false,
      message: "Could not be able to update the course!",
    });
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id).select(
    "name duration cost"
  );

  if (course)
    res.status(201).json({
      sucess: true,
      message: "Course has been found and delested sucessfully.",
    });
  else
    return res.status(401).json({
      sucess: false,
      message: "Could not be able to find and delete the course!",
    });
});

export { addCourse, modifyCourse, deleteCourse, getAllCourses, getCourseById };
