import express from "express";
import cors from "cors";
import experiencesRoutes from "./routes/experience";
import bookingsRoutes from "./routes/booking";
import promoRoutes from "./routes/promo";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/experiences", experiencesRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/promo", promoRoutes);

app.get("/", (req, res) => res.send({ ok: true }));

export default app;
