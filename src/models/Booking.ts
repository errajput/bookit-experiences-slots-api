import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  experience: mongoose.Types.ObjectId;
  slot: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  qty: number;
  totalPrice: number;
  promoCode?: string | null;
  createdAt: Date;
}

const BookingSchema: Schema = new Schema({
  experience: {
    type: Schema.Types.ObjectId,
    ref: "Experience",
    required: true,
  },
  slot: { type: Schema.Types.ObjectId, ref: "Slot", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  qty: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true },
  promoCode: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBooking>("Booking", BookingSchema);
