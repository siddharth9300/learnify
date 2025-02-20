const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  duration: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  videos: [{ type: String }],
  lectures: [lectureSchema],
});

module.exports = mongoose.model("Course", courseSchema);