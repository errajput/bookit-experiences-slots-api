import { Request, Response } from "express";

// simple in-memory promo list for demo
const promos: Record<string, { type: "percent" | "flat"; value: number }> = {
  SAVE10: { type: "percent", value: 10 },
  FLAT100: { type: "flat", value: 100 },
};

export const validatePromo = async (req: Request, res: Response) => {
  const { code, amount } = req.body as { code: string; amount: number };
  if (!code) return res.status(400).json({ error: "Promo code required" });
  const promo = promos[code.toUpperCase()];
  if (!promo) return res.json({ valid: false });

  let discount = 0;
  if (promo.type === "percent")
    discount = Math.round((amount * promo.value) / 100);
  else discount = promo.value;
  return res.json({
    valid: true,
    discount,
    newAmount: Math.max(0, amount - discount),
  });
};
