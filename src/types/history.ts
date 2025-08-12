export type HistoryStatus = "completed" | "pending" | "failed";

export interface HistoryDetailsData {
  enviou: string;
  tarifas: string;
  convertemos: string;
  cambio: string;
  tipoBeneficiario: string;
  codBanco: string;
  codAgencia: string;
  numeroConta: string;
  tipoConta: string;
  titular: string;
  banco: string;
}

export interface HistoryItem {
  id: string;
  createdAt: Date | string;
  name: string;
  amount: number;
  currencyCode: string;   
  status: HistoryStatus;
  code: string;
  details?: HistoryDetailsData;
}