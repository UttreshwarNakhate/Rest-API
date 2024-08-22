const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String },
  email: { type: String },
  age: { type: String },
  qualification: { type: String },
  address: { type: String },
  image: {
    path: { type: String },
    filename: { type: String },
  },
  uploadedAt: { type: Date, default: Date.now },
});

// const ImageModel = mongoose.model("Image", imageSchema);

export default mongoose.model("ImageModel", imageSchema, "images");
