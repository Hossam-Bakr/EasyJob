const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your job title"],
      trim: true,
      maxLength: [70, "Your job title cannot exceed 70 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter your description"],
      trim: true,
    },
    requirements: {
      type: [String],
      required: [true, "Please enter your requirements"],
      trim: true,
    },
    requiredSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    salary: {
      type: Number,
      required: [true, "Please enter your salary"],
      trim: true,
    },
    careerLevel: {
      type: String,
      enum: [
        "Student",
        "Entry",
        "Junior",
        "Mid-level",
        "Experienced",
        "Senior",
        "Lead",
        "Manager",
        "Director",
        "Executive",
        "Consultant",
        "Entrepreneur",
        "Chief",
        "Not specified",
      ],
      default: "Not specified",
    },
    type: {
      type: String,
      enum: [
        "Full time",
        "Part time",
        "Internship",
        "Temporary",
        "Freelance project",
        "Work from home",
      ],
      default: "Other",
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
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    // applicants: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    deadline: {
      type: Date,
      required: [true, "Please enter job deadline"],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
