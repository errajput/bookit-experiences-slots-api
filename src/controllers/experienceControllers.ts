import { Request, Response } from "express";
import Experience from "../models/Experience";
import Slot from "../models/Slot";

export const listExperiences = async (req: Request, res: Response) => {
  const q = req.query.q as string | undefined;
  const filter = q ? { title: new RegExp(q, "i") } : {};
  const experiences = await Experience.find(filter).lean();
  res.json({ data: experiences });
};

export const getExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const exp = await Experience.findById(id).lean();
  if (!exp) return res.status(404).json({ error: "Experience not found" });

  const slots = await Slot.find({ experience: id }).lean();
  res.json({ data: { ...exp, slots } });
};
