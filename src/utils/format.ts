export const fmtNumber = (n: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

export const fmtDate = (d: Date | string, locale: string) => {
  const dt = new Date(d);
  const dateStr = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dt);
  const timeStr = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(dt);
  return { dateStr, timeStr };
};

export const fmtBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

export const fmtCurrency = (n: number, currency: "BRL" | "MXN") => {
  const locales: Record<"BRL" | "MXN", string> = {
    BRL: "pt-BR",
    MXN: "es-MX",
  };

  return new Intl.NumberFormat(locales[currency], {
    style: "decimal",
    currency,
    minimumFractionDigits: 2,
  }).format(n);
};

export const fmtMoneyNoSymbol = (n: number, currency: "BRL" | "MXN") => {
  const locales: Record<"BRL" | "MXN", string> = { BRL: "pt-BR", MXN: "es-MX" };
  return new Intl.NumberFormat(locales[currency], {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
};

export const parseMoneyInput = (raw: string, currency: "BRL" | "MXN"): number => {
  if (!raw) return 0;

  let s = raw.replace(/[^\d.,]/g, "");

  if (currency === "BRL") {
    const lastComma = s.lastIndexOf(",");
    if (lastComma >= 0) {
      const int = s.slice(0, lastComma).replace(/\./g, "").replace(/,/g, "");
      const dec = s.slice(lastComma + 1).replace(/[^\d]/g, "");
      s = int + (dec ? "." + dec : "");
    } else {
      s = s.replace(/\./g, "").replace(/,/g, "");
    }
  } else {
    const lastDot = s.lastIndexOf(".");
    if (lastDot >= 0) {
      const int = s.slice(0, lastDot).replace(/[,\.]/g, "").replace(/[^\d]/g, "");
      const dec = s.slice(lastDot + 1).replace(/[^\d]/g, "");
      s = int + (dec ? "." + dec : "");
    } else {
      s = s.replace(/,/g, "");
    }
  }

  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
};