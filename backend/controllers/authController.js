const User = require("../models/userModel");
const Company = require("../models/companyModel");
const generateJWT = require("../utils/generateJWT");
const httpStatusText = require("../utils/httpStatusText");

exports.userSignup = async (req, res) => {
  try {
    const companyWithSameEmail = await Company.findOne({
      email: req.body.email,
    });

    if (companyWithSameEmail) {
      return res.status(409).json({
        status: httpStatusText.FAIL,
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

    const token = generateJWT(newUser._id);

    res.status(201).json({
      status: httpStatusText.SUCCESS,
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: httpStatusText.FAIL,
      message: err.message,
    });
  }
};

exports.companySignup = async (req, res) => {
  try {
    const userWithSameEmail = await User.findOne({ email: req.body.email });

    if (userWithSameEmail) {
      return res.status(409).json({
        status: httpStatusText.FAIL,
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

    const token = generateJWT(newCompany._id);

    res.status(201).json({
      status: httpStatusText.SUCCESS,
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
        status: httpStatusText.FAIL,
        message: "Please provide email and password",
      });

    const user = await User.findOne({ email }).select("+password");
    const company = await Company.findOne({ email }).select("+password");

    if (!user && !company)
      return res.status(404).json({
        status: httpStatusText.FAIL,
        message: "User not found",
      });

    if (user) {
      const isPasswordCorrect = await user.correctPassword(
        password,
        user.password
      );

      if (!isPasswordCorrect)
        return res.status(401).json({
          status: httpStatusText.FAIL,
          message: "Incorrect email or password",
        });

      const token = generateJWT(user._id);

      res.status(200).json({
        status: httpStatusText.SUCCESS,
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
          status: httpStatusText.FAIL,
          message: "Incorrect email or password",
        });

      const token = generateJWT(company._id);

      res.status(200).json({
        status: httpStatusText.SUCCESS,
        token,
        data: {
          company,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: httpStatusText.FAIL,
      message: err.message,
    });
  }
};
