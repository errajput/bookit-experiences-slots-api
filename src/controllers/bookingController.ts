import { Request, Response } from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking";
import Slot from "../models/Slot";

// Create a booking, ensure slot has available capacity
export const createBooking = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      slotId,
      experienceId,
      name,
      email,
      phone,
      qty = 1,
      promoCode,
      totalPrice,
    } = req.body;
    if (!slotId || !experienceId || !name || !email) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Lock-like behaviour using findOneAndUpdate to atomically increment bookedCount only if capacity allows
    const slot = await Slot.findOneAndUpdate(
      { _id: slotId, $expr: { $lt: ["$bookedCount", "$capacity"] } },
      { $inc: { bookedCount: qty } },
      { new: true, session }
    );

    if (!slot) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ error: "Slot is full or does not exist" });
    }

    // Create booking
    const booking = await Booking.create(
      [
        {
          experience: experienceId,
          slot: slotId,
          name,
          email,
          phone,
          qty,
          promoCode: promoCode || null,
          totalPrice,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ data: booking[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
