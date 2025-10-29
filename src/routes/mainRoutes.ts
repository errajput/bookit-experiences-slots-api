import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Experience from "../models/Experience";
import Slot from "../models/Slot";
import Booking from "../models/Booking";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                              PROMO VALIDATION                            */
/* -------------------------------------------------------------------------- */

const promos: Record<string, { type: "percent" | "flat"; value: number }> = {
  SAVE10: { type: "percent", value: 10 },
  FLAT100: { type: "flat", value: 100 },
};

// POST /promo/validate
router.post("/promo/validate", async (req: Request, res: Response) => {
  try {
    const { code, amount } = req.body as { code: string; amount: number };

    if (!code) return res.status(400).json({ error: "Promo code required" });

    const promo = promos[code.toUpperCase()];
    if (!promo)
      return res.json({ valid: false, message: "Invalid promo code" });

    let discount =
      promo.type === "percent"
        ? Math.round((amount * promo.value) / 100)
        : promo.value;

    const newAmount = Math.max(0, amount - discount);

    res.json({
      valid: true,
      code: code.toUpperCase(),
      type: promo.type,
      discount,
      newAmount,
    });
  } catch (err) {
    console.error("Promo validation failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* -------------------------------------------------------------------------- */
/*                             EXPERIENCES ROUTES                           */
/* -------------------------------------------------------------------------- */

// GET /api/experiences - list (supports ?q= search)
router.get("/api/experiences", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string | undefined;
    const filter = q ? { title: new RegExp(q, "i") } : {};
    const experiences = await Experience.find(filter).lean();
    res.json({ data: experiences });
  } catch (error) {
    console.error("Error listing experiences:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/experiences/:id - single experience with slots
router.get("/api/experiences/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exp = await Experience.findById(id).lean();
    if (!exp) return res.status(404).json({ error: "Experience not found" });

    const slots = await Slot.find({ experience: id }).lean();
    res.json({ data: { ...exp, slots } });
  } catch (error) {
    console.error("Error getting experience:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/* -------------------------------------------------------------------------- */
/*                               BOOKING ROUTES                             */
/* -------------------------------------------------------------------------- */

// POST /api/bookings - create new booking
router.post("/api/bookings", async (req: Request, res: Response) => {
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

    // Check and update slot capacity
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

    res.status(201).json({ success: true, data: booking[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Booking creation failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
