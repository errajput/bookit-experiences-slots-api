import mongoose from "mongoose";
import Experience from "../models/Experience";
import Slot from "../models/Slot";
import Promo from "../models/Promo";

const MONGO_URI = process.env.MONGO_URI || "";
const DB_NAME = process.env.DB_NAME || "";

const seedExperiencesData = [
  {
    title: "Kayaking",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking",
    location: "Udupi",
    price: 999,
    image: "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf",
  },
  {
    title: "Nandi Hills Sunrise",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking",
    location: "Bangalore",
    price: 899,
    image: "https://images.unsplash.com/photo-1577174696285-05315444c73f",
  },

  {
    title: "Kayaking",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking",
    location: "Udupi, Karnataka",
    price: 999,
    image: "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf",
  },
  {
    title: "Nandi Hills Sunrise",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking",
    location: "Bangalore",
    price: 899,
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  },
  {
    title: "Boat Cruise",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking",
    location: "Sunderban",
    price: 999,
    image: "https://images.unsplash.com/photo-1583157048761-ac1dba033233",
  },
  {
    title: "Coffee Trail",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking",
    location: "coorg",
    price: 1299,
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
  },
  {
    title: "Bunjee Jumping",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking",
    location: "Manali",
    price: 999,
    image: "https://images.unsplash.com/photo-1675259113512-db50297ce326",
  },
  {
    title: "Coffee Trail",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking",
    location: "coorg",
    price: 1299,
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
  },
];

const seedSlotsData = [
  [
    { date: "2025-10-30", time: "07:00", capacity: 5 },
    { date: "2025-10-30", time: "09:00", capacity: 5 },
    { date: "2025-10-30", time: "11:00", capacity: 5 },
    { date: "2025-10-30", time: "13:00", capacity: 5 },
    { date: "2025-10-31", time: "07:00", capacity: 5 },
    { date: "2025-10-31", time: "09:00", capacity: 5 },
  ],
  [
    { date: "2025-10-30", time: "07:00", capacity: 5 },
    { date: "2025-10-30", time: "09:00", capacity: 5 },
    { date: "2025-10-31", time: "07:00", capacity: 5 },
    { date: "2025-10-31", time: "09:00", capacity: 5 },
    { date: "2025-10-31", time: "11:00", capacity: 5 },
    { date: "2025-10-31", time: "13:00", capacity: 5 },
  ],
  [
    { date: "2025-10-30", time: "07:00", capacity: 5 },
    { date: "2025-10-30", time: "09:00", capacity: 5 },
    { date: "2025-10-31", time: "07:00", capacity: 5 },
    { date: "2025-10-31", time: "09:00", capacity: 5 },
    { date: "2025-10-31", time: "11:00", capacity: 5 },
    { date: "2025-10-31", time: "13:00", capacity: 5 },
  ],
  [
    { date: "2025-10-31", time: "11:00", capacity: 5 },
    { date: "2025-10-31", time: "13:00", capacity: 5 },
    { date: "2025-11-01", time: "07:00", capacity: 5 },
    { date: "2025-11-02", time: "09:00", capacity: 5 },
    { date: "2025-11-03", time: "07:00", capacity: 5 },
    { date: "2025-11-03", time: "09:00", capacity: 5 },
  ],
  [
    { date: "2025-10-31", time: "09:00", capacity: 5 },
    { date: "2025-10-31", time: "11:00", capacity: 5 },
    { date: "2025-10-31", time: "13:00", capacity: 5 },
    { date: "2025-11-01", time: "07:00", capacity: 5 },
    { date: "2025-11-02", time: "09:00", capacity: 5 },
    { date: "2025-11-02", time: "07:00", capacity: 5 },
  ],
  [
    { date: "2025-10-31", time: "07:00", capacity: 5 },
    { date: "2025-10-31", time: "09:00", capacity: 5 },
    { date: "2025-10-31", time: "11:00", capacity: 5 },
    { date: "2025-10-31", time: "13:00", capacity: 5 },
    { date: "2025-11-01", time: "07:00", capacity: 5 },
    { date: "2025-11-01", time: "09:00", capacity: 5 },
  ],
  [
    { date: "2025-10-31", time: "09:00", capacity: 5 },
    { date: "2025-10-31", time: "11:00", capacity: 5 },
    { date: "2025-10-31", time: "13:00", capacity: 5 },
    { date: "2025-11-03", time: "07:00", capacity: 5 },
    { date: "2025-11-02", time: "09:00", capacity: 5 },
    { date: "2025-11-01", time: "07:00", capacity: 5 },
  ],
  [
    { date: "2025-11-01", time: "07:00", capacity: 5 },
    { date: "2025-11-01", time: "09:00", capacity: 5 },
    { date: "2025-11-02", time: "08:00", capacity: 5 },
    { date: "2025-11-02", time: "09:00", capacity: 5 },
    { date: "2025-11-03", time: "10:00", capacity: 5 },
    { date: "2025-11-04", time: "14:00", capacity: 5 },
  ],
];

const seedPromoData = [
  { code: "SAVE10", discount: 10 },
  { code: "SAVE100", discount: 100 },
];

async function seed() {
  if (!MONGO_URI) throw new Error("MONGO_URI not set");
  await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
  console.log("Connected");

  await Experience.deleteMany({});
  await Slot.deleteMany({});
  await Promo.deleteMany({});

  const experiences = await Experience.create(seedExperiencesData);

  for (let i = 0; i < experiences.length; i++) {
    const experience = experiences[i];
    const slotData = seedSlotsData[i].map((s) => ({
      ...s,
      experience: experience.id,
    }));
    await Slot.create(slotData);
  }

  await Promo.create(seedPromoData);

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
