const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your company name"],
      trim: true,
      maxLength: [50, "Your companyName cannot exceed 50 characters"],
      minLength: [3, "Your companyName must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter your description"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, "Please enter your industry"],
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    founded: {
      type: Date,
      // required: [true, "Please enter your founded date"],
    },
    size: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },
    avatar: String,
    // jobs: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Job",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
