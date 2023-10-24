const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your skill name"],
      trim: true,
    },
    proficiency: {
      type: Number,
      required: [true, "Please enter your skill proficiency"],
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    interest: {
      type: Number,
      required: [true, "Please enter your skill interest"],
      enum: [1, 2, 3, 4],
      default: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
