export type Currency = "BRL" | "MXN";

export type Quote = {
  quoteId: string;
  ts: number;
  from: Currency;
  to: Currency;
  rate: number;
  fees: { fixed: number; percent: number; percentValue: number; total: number };
  breakdown: { sendAmount: number; baseAfterFees: number; receiveAmount: number };
};