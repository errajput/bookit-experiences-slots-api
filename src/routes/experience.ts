import { Router } from "express";
import {
  getExperience,
  listExperiences,
} from "../controllers/experienceControllers";

const router = Router();
router.get("/", listExperiences);
router.get("/:id", getExperience);

export default router;
