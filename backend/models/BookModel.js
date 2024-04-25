import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  created_at: { type: Date, default: Date.now }, //Timestamps wasn't working
  updated_at: { type: Date, default: Date.now },
});

export const Book = mongoose.model("Books Details", bookSchema);
