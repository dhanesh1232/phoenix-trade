import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    id: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    fileName: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

categorySchema.pre("findOneAndDelete", async function (next) {
  const categoryId = this.getQuery()._id;

  if (!categoryId) {
    if (typeof next === "function") next();
    return;
  }
  try {
    // Delete all products with this category
    await mongoose.model("Product").deleteMany({ category: categoryId });

    if (typeof next === "function") next();
  } catch (e: unknown) {
    if (typeof next === "function") next(e as Error);
  }
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
