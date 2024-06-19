import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  employess: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

export default model("User", userSchema);
