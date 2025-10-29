import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// CONFIG
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const DB_NAME = process.env.DB_NAME || "";

//  MIDDLEWARE
app.use(cors());
app.use(express.json());

//  ROUTES

import mainRoutes from "./routes/mainRoutes";

app.use("/", mainRoutes);

// BASE ROUTE
app.get("/", (req, res) => {
  res.send({ ok: true, message: "BookIt API is running " });
});

//  DATABASE + SERVER START
async function startServer() {
  if (!MONGO_URI) {
    console.error(" MONGO_URI not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(" MongoDB connected");

    app.listen(PORT, () => {
      console.log(` Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
    process.exit(1);
  }
}

startServer();
