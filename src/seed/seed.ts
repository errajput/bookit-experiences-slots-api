import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "../models/Experience";
import Slot from "../models/Slot";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

async function seed() {
  if (!MONGO_URI) throw new Error("MONGO_URI not set");
  await mongoose.connect(MONGO_URI);
  console.log("Connected");

  await Experience.deleteMany({});
  await Slot.deleteMany({});

  const experiences = await Experience.create([
    {
      title: "Kayaking",
      slug: "kayaking",
      description: "Curated small-group kayaking experience",
      location: "Udupi, Karnataka",
      price: 999,
      images: [
        "https://images.unsplash.com/photo-1",
        "https://images.unsplash.com/photo-2",
      ],
    },
    {
      title: "Nandi Hills Sunrise",
      slug: "nandi-hills",
      description: "Sunrise trek",
      location: "Bangalore",
      price: 899,
      images: [],
    },
  ]);

  const [kayak] = experiences;

  const slots = [
    { experience: kayak._id, date: "2025-10-22", time: "09:00", capacity: 8 },
    { experience: kayak._id, date: "2025-10-22", time: "07:00", capacity: 6 },
    { experience: kayak._id, date: "2025-10-23", time: "09:00", capacity: 8 },
  ];

  await Slot.create(slots);

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
