import mongoose, { Schema, Document } from "mongoose";

export interface ISlot extends Document {
  experience: mongoose.Types.ObjectId;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:00"
  capacity: number;
  bookedCount: number;
}

const SlotSchema: Schema = new Schema({
  experience: {
    type: Schema.Types.ObjectId,
    ref: "Experience",
    required: true,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  capacity: { type: Number, default: 10 },
  bookedCount: { type: Number, default: 0 },
});

export default mongoose.model<ISlot>("Slot", SlotSchema);
