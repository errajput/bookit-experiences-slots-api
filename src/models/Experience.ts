import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  title: string;
  slug?: string;
  description: string;
  location?: string;
  price: number;
  currency?: string;
  images: string[];
  tags?: string[];
  durationMinutes?: number;
}

const ExperienceSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  description: { type: String, default: "" },
  location: String,
  price: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  images: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  durationMinutes: Number,
});

export default mongoose.model<IExperience>("Experience", ExperienceSchema);
