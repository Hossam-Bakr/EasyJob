const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
      maxLength: [20, "Your firstName cannot exceed 20 characters"],
      minLength: [3, "Your firstName must be at least 3 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
      maxLength: [20, "Your lastName cannot exceed 20 characters"],
      minLength: [3, "Your lastName must be at least 3 characters"],
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
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: String,
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    // embedded applications without details
    applications: [
      {
        job: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
