import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  product: string;
  quantity?: string;
  country: string;
  packaging?: string;
  timeline?: string;
  message?: string;
  phone?: string;
  status: "new" | "in_review" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    product: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    quantity: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    packaging: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    timeline: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    status: {
      type: String,
      enum: ["new", "in_review", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry =
  models.Enquiry || model<IEnquiry>("Enquiry", EnquirySchema);
