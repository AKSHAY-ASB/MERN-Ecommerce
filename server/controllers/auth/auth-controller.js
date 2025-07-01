const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });


    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with same email ! Please try later",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
     const checkUser = await User.findOne({ email });

     if(!checkUser) return res.json({
        success:false,
        message:"User does not exists please register first!"
     })

     const checkPasswordMatch = await bcrypt.compare(password , checkUser.password);
    if(!checkPasswordMatch) return res.json({
        success:false,
        message:"Incorrect Password ! Please try again later"
     })

     const token = jwt.sign({
        id:checkUser._id, 
        role:checkUser.role,
        email:checkUser.email
     },"CLIENT_SECRET_KEY",{expiresIn:"60m"});


res.cookie("token",token, {httpOnly:true, secure:false}).json({
    success:true,
    message:"Logged In Successfully.",
    user :{
        email:checkUser.email,
        role:checkUser.role,
        id:checkUser._id
    }
})

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//logout

    const logoutUser = (req,res) => {
        res.clearCookie("token").json({
            success:true,
            message:"Logged out Successfully"
        })
    }
//auth middleware

    const authMiddleware = async (req,res,next) => {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({
            success:false,
            message:"Unauthorised User !"
        })

        try {
          const decoded = jwt.verify(token,"CLIENT_SECRET_KEY");
          req.user = decoded;
          next();
        } catch (error) {
          res.status(401).json({
            success:false,
            message:"Unauthorised User !"
        });
        }

    }

module.exports = { registerUser ,loginUser ,logoutUser,authMiddleware};
