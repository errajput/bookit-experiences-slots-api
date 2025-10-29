import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
}

const ExperienceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IExperience>("Experience", ExperienceSchema);
