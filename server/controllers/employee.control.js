//read employees
import User from "../model/User.model.js";
import Joi from "joi";
import Employee from "../model/employess.model.js";

//Create Employee block
const employeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid("male", "female").required(),
  image: Joi.string().uri().required(),
  mobileNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  course: Joi.array().items(Joi.string().min(2).max(100)).required(),
  employeer: Joi.string().required(),
  designation: Joi.string().min(2).max(100).required(),
});

export const createEmployee = async (req, res) => {
  const { error, value } = employeeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const {
    employeer,
    name,
    email,
    gender,
    image,
    mobileNumber,
    course,
    designation,
  } = value;

  try {
    const user = await User.findOne({ _id: employeer });
    const existingEmployee = await Employee.findOne({ email: email });
    const existingEmployeeNo = await Employee.findOne({
      mobileNumber: mobileNumber,
    });

    if (existingEmployeeNo) {
      return res
        .status(400)
        .json({ error: "Employee mobile number already exists" });
    }

    if (existingEmployee) {
      return res.status(400).json({ error: "Employee email already exists" });
    }
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    const employee = await Employee.create({
      employeer,
      name,
      email,
      gender: gender.toLowerCase(),
      image,
      mobileNumber,
      course: course,
      designation: designation.toLowerCase(),
      createdAt: Date.now(),
    });

    await employee.save();

    user?.employess.push(employee._id);

    await user.save();

    await res.status(201).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

//Update employee block

const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  gender: Joi.string().valid("male", "female", "other"),
  image: Joi.string().uri(),
  mobileNumber: Joi.string().pattern(/^[0-9]{10}$/),
  course: Joi.array().items(Joi.string().min(2).max(100)).required(),
  designation: Joi.string().min(2).max(100),
}).min(1); // At least one field is required

export const updateEmployee = async (req, res) => {
  const { id } = req.params;

  const { error, value } = updateEmployeeSchema.validate(req.body);
  const { name, email, gender, image, mobileNumber, course, designation } =
    value;

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Assuming updateEmployeeService is the service function to update an employee

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        email,
        gender: gender.toLowerCase(),
        image,
        mobileNumber,
        course,
        designation: designation.toLowerCase(),
        updatedAt: Date.now(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res
      .status(400)
      .json({ error: "You May Have entered existing number or email" });
  }
};

//Delete employee block
export const deleteEmployee = async (req, res) => {
  const { employee_id, employer_id } = req.body;

  try {
    const employeer = await User.findById(employer_id);
    if (!employeer) {
      return res.status(404).json({ error: "user not found" });
    }
    const employeeToDelete = await Employee.findByIdAndDelete(employee_id);
    if (!employeeToDelete) {
      return res.status(404).json({ error: "Employee not found" });
    }

    employeer.employess.pull(employee_id);

    await employeer.save();
    res.status(200).json({ message: " employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Read all created employees by ID
export const getUserWithEmployees = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the user by ID and populate the employees field
    const user = await User.findById(id).populate({
      path: "employess",
      options: { sort: { createdAt: -1 } },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.employess);
  } catch (err) {
    console.error("Error fetching user with employees:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
