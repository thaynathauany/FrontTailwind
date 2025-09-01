import { NextResponse } from "next/server";

type Currency = "BRL" | "MXN";

const RATES: Record<Currency, Partial<Record<Currency, number>>> = {
  BRL: { MXN: 3.43},
  MXN: { BRL: 0.29 },
};

const FEES = {
  fixed: 6.5,
  percent: 0.0125,
};
type Body = {
  sendAmount: number;
  from: Currency;
  to: Currency;
};

export async function POST(req: Request) {
  const { sendAmount, from, to } = (await req.json()) as Body;

  if (!sendAmount || sendAmount <= 0) {
    return NextResponse.json({ error: "invalid_params" }, { status: 400 });
  }

  if (from === to) {
    return NextResponse.json({ error: "same_currency" }, { status: 400 });
  }

  const rate = RATES[from]?.[to];
  if (typeof rate !== "number") {
    return NextResponse.json({ error: "rate_not_found" }, { status: 404 });
  }

  const feeFixed = FEES.fixed;
  const feePercentValue = +(sendAmount * FEES.percent).toFixed(2);
  const feeTotal = +(feeFixed + feePercentValue).toFixed(2);

  const baseAfterFees = +(sendAmount - feeTotal).toFixed(2);
  const receiveAmount = +(baseAfterFees * rate).toFixed(2);

  return NextResponse.json(
    {
      quoteId: crypto.randomUUID(),
      ts: Date.now(),
      from,
      to,
      rate,
      fees: {
        fixed: feeFixed,
        percent: FEES.percent,
        percentValue: feePercentValue,
        total: feeTotal,
      },
      breakdown: {
        sendAmount,
        baseAfterFees,
        receiveAmount,
      },
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

// O cliente pagou 150,00 BRL.
// Desses, 8,38 BRL foram para taxas.
// Restou 141,62 BRL, que foi convertido.
// O beneficiário recebe 485,76 MXN.