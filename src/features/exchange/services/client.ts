import { Currency, Quote } from "../types";

export async function fetchQuote(
  params: { sendAmount: number; from: Currency; to: Currency },
  signal?: AbortSignal
): Promise<Quote> {
  const r = await fetch("/api/quote", {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!r.ok) throw new Error("quote_failed");
  return r.json();
}