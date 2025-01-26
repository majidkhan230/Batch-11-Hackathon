import errorHandler from "../helpers/error.handler.js";
import { generateToken } from "../helpers/generateToken.js";
import { resetMail } from "../mailtrap/email.js";
import transporter from "../mailtrap/mailtrap.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const register = async (req, res,next) => {
  try {
    console.log(req.body)
    const user = await userModel.findOne({ email: req.body.email });
    


    if (user) {
      return next(errorHandler(409, "User already exists"));
    }

    // const hashPassword = await bcrypt.hash(req.body.password, 10);
    


    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      CNIC:req.body.CNIC
    });

    const token = crypto.randomBytes(20).toString("hex");
    console.log(token);

    user.resetPasswordToken = token;
    
    await resetMail(req.body.email,`https://batch-11-hackathon-ed87.vercel.app/reset/${token}`);
    res.status(200).send("email send successfully");

    // resetMail(req.body.email, 'dfla;dkf')
//     const info = await transporter.sendMail({
//       from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//       to: "bar@example.com, baz@example.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <title>Password Reset</title>
//         <style>
//           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//           .container { 
//             max-width: 600px; 
//             margin: 0 auto; 
//             padding: 20px; 
//             background-color: #f4f4f4; 
//             border-radius: 5px; 
//           }
//           .button {
//             display: inline-block;
//             background-color: #007bff;
//             color: white;
//             padding: 10px 20px;
//             text-decoration: none;
//             border-radius: 5px;
//             margin-top: 15px;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h2>Password Reset Request</h2>
//           <p>You have requested to generate  your password. Click the button below to proceed:</p>
//           <a 
//   href={``} 
//   className="button"
// >
//   Generate Password
// </a>
//           <p style="font-size: 0.8em; color: #666;">
//             This link will expire in 1 hour for your security.
//           </p>
//         </div>
//       </body>
//       </html>
//     ` // html body
//     });

    res.send({
      message:"message sent successfully"
    })


    
    
    
// if(file){
//   newUser.avatar = req.file.path
// }

// newUser.save()


    // res.status(201).send({
    //   success: true,
    //   message: "User registered successfully",
    //   user: newUser,
    // });
  } catch (error) {
    res.send({message: error.message})
    // next(errorHandler(error));
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

export const GoogleLogin = async (req, res, next) => {
  console.log("hitted")
  try {
      const { name, email, avatar } = req.body
      console.log(name,email,avatar)
      let user = await userModel.findOne({ email })
      if (!user) {
          //  create new user 
          const password = Math.random().toString()
          const hashPassword = await bcrypt.hash(password, 10);
          const newUser = new userModel({
              name, email, password: hashPassword, avatar
          })

          user = await newUser.save()

      }


      const token = generateToken({
          email: user.email,
  })


      res.cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          path: '/'
      })

      const newUser = user.toObject({ getters: true })
      delete newUser.password
      res.status(200).json({
          success: true,
          user: newUser,
          message: 'Login successfuly.'
      })

  } catch (error) {
      next(errorHandler(500, error.message))
  }
}

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


const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ message: "Email field is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    console.log(token);

    user.resetPasswordToken = token;

    await user.save();
    await resetMail(email,`https://batch-11-hackathon-ed87.vercel.app/reset/${token}`);
    res.status(200).send("email send successfully");


  } catch (error) {
    next(errorHandler(500, error.message))
  }
};


const resetPassword = async(req,res)=>{
  console.log('reset password clicked')
  
  const password = req.body.password;
  console.log(password)
  const token = req.params.token
  console.log(token)
try {
  const user  = await userModel.findOne({resetPasswordToken : token})
  console.log(user)
  if(!user){
    return res.status(404).json({ message: "invalid token or expired" })
  }
  const hashPassword = await bcrypt.hash(password,10)

  user.password = hashPassword
  user.resetPasswordToken = undefined;
  await user.save()
  res.status(200).json({ message: "password reset successfully",
  })
  
} catch (error) {
  next(errorHandler(500, error.message))
}
}



const authController = { register,login,logout,GoogleLogin,forgotPassword,resetPassword };

export default authController;
