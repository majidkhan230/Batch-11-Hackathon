import errorHandler from "../helpers/error.handler.js";
import { generateToken } from "../helpers/generateToken.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const register = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });


    if (user) {
      return next(errorHandler(409, "User already exists"));
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    next(errorHandler(error));
  }
};

const login = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email }).select("+password");
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    const token = await generateToken(req.body.email)

    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        path: '/'
    })

    const newUser = user.toObject({getters:true})
    delete newUser.password
    
    
    res.send({
        message:'login sucessfully',
        user:newUser,
        token:token,
    })

    

  } catch (error) {
    next(errorHandler(error));
  }
};

const logout = async (req, res, next) => {
  try {


    res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        path: '/'
    })

    
    
    res.send({
        message:'logout sucessfully',
    })

    

  } catch (error) {
    next(errorHandler(error));
  }
};
const authController = { register,login,logout };

export default authController;
