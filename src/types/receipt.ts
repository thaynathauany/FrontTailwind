export type ReceiptData = {
  txNumber: string;
  datetime: string;
  sentLabel: string;
  feeLabel: string;
  convertedLabel: string;
  beneficiary: {
    name: string;
    rfc?: string;
    account?: string;
    bank?: string;
    countryCity?: string;
    route?: string;
    method?: string;
  };
  notes?: string[];
};