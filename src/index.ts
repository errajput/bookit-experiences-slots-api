import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

start();
