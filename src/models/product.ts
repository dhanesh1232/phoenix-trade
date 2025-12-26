// models/Product.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export type Availability = "enquiry" | "in_stock" | "preorder";
export type ProductStatus = "active" | "draft" | "inactive";
export type Market = "EU" | "GCC" | "US" | "ASEAN";

export interface ProductImage {
  id: string;
  url: string;
  fileName?: string;
  name?: string;
}

export interface ProductSpecifications {
  origin?: string;
  processingType?: string;
  shelfLife?: string;
  certifications?: string[];
  applications?: string[];
}

export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  shortDescription: string;
  description: object;
  specifications: ProductSpecifications;
  availability: Availability;
  markets: Market[];
  tags: string[];
  status: ProductStatus;
  images: {
    featured?: ProductImage;
    gallery: ProductImage[];
  };
  seo?: ProductSEO;
  detailPage: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductImageSchema = new Schema<ProductImage>(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    fileName: { type: String },
    name: { type: String },
  },
  { _id: false }
);

const SpecificationsSchema = new Schema<ProductSpecifications>(
  {
    origin: { type: String },
    processingType: { type: String },
    shelfLife: { type: String },
    certifications: [{ type: String }],
    applications: [{ type: String }],
  },
  { _id: false }
);

const SEOSchema = new Schema<ProductSEO>(
  {
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    }, // or { type: Schema.Types.ObjectId, ref: "Category", required: true }

    shortDescription: {
      type: String,
      maxlength: 400,
      required: true,
    },

    description: {
      type: Object,
      default: "",
    },

    specifications: {
      type: SpecificationsSchema,
      default: {},
    },

    availability: {
      type: String,
      enum: ["enquiry", "in_stock", "preorder"],
      required: true,
      default: "enquiry",
    },

    markets: {
      type: [String],
      enum: ["EU", "GCC", "US", "ASEAN"],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "draft", "inactive"],
      required: true,
      default: "active",
      index: true,
    },

    images: {
      featured: { type: ProductImageSchema, required: false },
      gallery: { type: [ProductImageSchema], default: [] },
    },

    seo: {
      type: SEOSchema,
      default: {},
    },
    detailPage: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Helpful indexes
ProductSchema.index({
  name: "text",
  shortDescription: "text",
  description: "text",
});
ProductSchema.index({ productType: 1, availability: 1, status: 1 });
ProductSchema.index({ "specifications.certifications": 1 });
ProductSchema.index({ markets: 1 });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
