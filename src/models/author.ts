import mongoose from "mongoose";

const authorSchema = new mongoose.Schema<AuthorDto>({
  name: {
    type: String,
  },
});

export default mongoose.model("authors", authorSchema);
