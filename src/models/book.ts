import mongoose, { HydratedDocument } from "mongoose";

const bookSchema = new mongoose.Schema<BookDto>({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

export default mongoose.model("books", bookSchema);
