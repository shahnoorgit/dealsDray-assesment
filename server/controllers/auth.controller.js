import generateTokenandsetCookie from "../utils/JwtTokens.js";
import bcrypt from "bcrypt";
import User from "../model/User.model.js";
import Joi from "joi";

export const signupuser = async (req, res) => {
  const signupValSchema = Joi.object({
    fullname: Joi.string().min(3).max(25).required(),
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(7).max(20).required(),
    confirmPassword: Joi.string().min(7).max(20).required(),
  });
  try {
    const { error, value } = signupValSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { fullname, username, password, confirmPassword } = value;
    if (password != confirmPassword) {
      return res.status(200).json("password dont match ");
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(200).json({ userInvalid: "username already exits" });
    }
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      employess: [],
    });
    if (newUser) {
      generateTokenandsetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const loginuser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPassword = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPassword) {
      return res.status(400).json({ error: "invalid login credentials" });
    }

    generateTokenandsetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const logoutuser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "user logged out succesfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
