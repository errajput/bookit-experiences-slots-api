import mongoose, { Schema, Document } from "mongoose";

export interface IPromo extends Document {
  code: string;
  discount: number;
  totalCount: number;
  usedCount: number;
}

const PromoSchema: Schema = new Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  totalCount: { type: Number, default: 10 },
  usedCount: { type: Number, default: 0 },
});

export default mongoose.model<IPromo>("Promo", PromoSchema);
