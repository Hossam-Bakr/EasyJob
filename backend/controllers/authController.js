const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Company = require("../models/companyModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.userSignup = async (req, res) => {
  try {
    const companyWithSameEmail = await Company.findOne({
      email: req.body.email,
    });

    if (companyWithSameEmail) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      skills: req.body.skills,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.companySignup = async (req, res) => {
  try {
    const userWithSameEmail = await User.findOne({ email: req.body.email });

    if (userWithSameEmail) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    const newCompany = await Company.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      description: req.body.description,
      phone: req.body.phone,
      industry: req.body.industry,
      location: req.body.location,
      founded: req.body.founded,
      size: req.body.size,
    });

    const token = signToken(newCompany._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        company: newCompany,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });

    const user = await User.findOne({ email }).select("+password");
    const company = await Company.findOne({ email }).select("+password");

    if (!user && !company)
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });

    if (user) {
      const isPasswordCorrect = await user.correctPassword(
        password,
        user.password
      );

      if (!isPasswordCorrect)
        return res.status(401).json({
          status: "fail",
          message: "Incorrect email or password",
        });

      const token = signToken(user._id);

      res.status(200).json({
        status: "success",
        token,
        data: {
          user,
        },
      });
    } else if (company) {
      const isPasswordCorrect = await company.correctPassword(
        password,
        company.password
      );

      if (!isPasswordCorrect)
        return res.status(401).json({
          status: "fail",
          message: "Incorrect email or password",
        });

      const token = signToken(company._id);

      res.status(200).json({
        status: "success",
        token,
        data: {
          company,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
