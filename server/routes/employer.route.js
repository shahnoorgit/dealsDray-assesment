import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getUserWithEmployees,
  updateEmployee,
} from "../controllers/employee.control.js";

const router = express.Router();

router.get("/get-employess/:id", getUserWithEmployees);
router.post("/create-employee", createEmployee);
router.post("/update-employee/:id", updateEmployee);
router.delete("/delete-employee", deleteEmployee);

export default router;
