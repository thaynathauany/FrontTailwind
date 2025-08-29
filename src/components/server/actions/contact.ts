"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().optional().default(""),
  message: z.string().min(5)
});

export async function sendContact(input: unknown): Promise<boolean> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return false;

  try {
    const res = await fetch(`${process.env.API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
      cache: "no-store"
    });

    return res.ok;
  } catch {
    return false;
  }
}