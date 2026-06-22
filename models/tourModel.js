const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tour name is required"],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, "Tour duration is required"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "Tour group size is required"],
  },
  difficulty: {
    type: String,
    required: [true, "Tour diificulty is required"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Tour price is required"],
  },
  priceDiscount: Number,
  summary: {
    type: Number,
    required: [true, "Tour summary is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have an image cover"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = new mongoose.model("Tour", tourSchema);
module.exports = Tour;
