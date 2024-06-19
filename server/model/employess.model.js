import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  employeer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },

  designation: {
    type: String,
    required: true,
    enum: ["hr", "manager", "sales"],
  },

  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },

  course: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
  },
});

export default model("Employee", employeeSchema);
